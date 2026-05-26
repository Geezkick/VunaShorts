require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const db = require('./database');
const http = require('http');
const { Server } = require('socket.io');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
let fetch;
import('node-fetch').then(module => fetch = module.default);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Setup local storage for mock uploads (will be replaced by S3/Firebase later)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads');
    const fs = require('fs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Endpoints ---

// Get all series (Join with users for creator info)
app.get('/api/series', async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id, s.title, s.description, s.genre, s.tags, s.episodes, 
        s.free_episodes AS "freeEpisodes", s.price_per_episode AS "pricePerEpisode",
        s.currency, s.country, s.poster, s.gradient_poster AS "gradientPoster",
        s.views, s.rating, s.completion_rate AS "completionRate", s.video_url AS "video_url", s.created_at,
        u.id AS "creatorId", u.name AS "creatorName", u.handle AS "creatorHandle",
        u.avatar AS "creatorAvatar", u.verified AS "creatorVerified"
      FROM series s
      JOIN users u ON s.creator_id = u.id
      ORDER BY s.created_at DESC
    `;
    
    const result = await db.query(query);
    
    // Map back to frontend structure
    const formatted = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      genre: row.genre,
      tags: row.tags || [],
      episodes: row.episodes,
      freeEpisodes: row.freeEpisodes,
      pricePerEpisode: row.pricePerEpisode,
      currency: row.currency,
      country: row.country,
      poster: row.poster,
      gradientPoster: row.gradientPoster,
      views: row.views,
      rating: row.rating,
      completionRate: row.completionRate,
      video_url: row.video_url,
      createdAt: row.created_at,
      creator: {
        id: row.creatorId,
        name: row.creatorName,
        handle: row.creatorHandle,
        avatar: row.creatorAvatar,
        verified: row.creatorVerified
      }
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching series:', err);
    res.status(500).json({ error: 'Failed to fetch series' });
  }
});

// Create a new series
app.post('/api/series', upload.single('video'), async (req, res) => {
  const { title, description, genre, episodes, edits: editsJson, templateUrl } = req.body || {};
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const creatorId = 'u1'; // Hardcoded to Zuri for now
  const id = 's' + Date.now();
  const tags = JSON.stringify(['new', (genre || '').toLowerCase()]);
  
  let videoUrl = req.file ? `/uploads/${req.file.filename}` : null;
  let finalFilePath = req.file ? req.file.path : null;

  try {
    let edits = null;
    if (editsJson) {
      try { edits = JSON.parse(editsJson); } catch(e){}
    }

    if (edits && (finalFilePath || templateUrl)) {
      const sourcePath = finalFilePath || templateUrl;
      const outName = 'processed-' + Date.now() + '.m3u8';
      const outPath = path.join(__dirname, 'uploads', outName);
      const vttName = outName.replace('.m3u8', '.vtt');
      const vttPath = path.join(__dirname, 'uploads', vttName);
      
      // Simulate AI generated translation subtitles (Swahili to English)
      const mockVTT = `WEBVTT

00:00:00.000 --> 00:00:04.000
[AI Translation] The energy in this city is unmatched!

00:00:04.500 --> 00:00:08.000
[AI Translation] We have to keep moving forward.

00:00:08.500 --> 00:00:15.000
[AI Translation] (Music plays...)
`;
      fs.writeFileSync(vttPath, mockVTT);

      await new Promise((resolve, reject) => {
        let cmd = ffmpeg(sourcePath);
        
        // Trim
        if (edits.trimStart !== undefined) cmd.setStartTime(edits.trimStart);
        if (edits.trimDuration !== undefined) cmd.setDuration(edits.trimDuration);
        
        // Complex filters for video & audio
        let complexFilter = [];
        
        // Speed and EQ
        let vFilter = `setpts=${1 / (edits.speed || 1)}*PTS,eq=brightness=${((edits.brightness || 100) / 100 - 1) * 0.5}:contrast=${(edits.contrast || 100) / 100}:saturation=${(edits.saturation || 100) / 100}`;
        if (edits.filter === 'grayscale(1) contrast(1.25)') vFilter += ',hue=s=0'; // B&W
        // Additional CSS to FFmpeg mappings can be added here
        
        complexFilter.push(`[0:v]${vFilter}[vout]`);
        
        let aFilter = `atempo=${edits.speed || 1},volume=${(edits.originalVolume || 100) / 100}`;
        
        // Music track mixing
        if (edits.musicTrack) {
          cmd.addInput(edits.musicTrack);
          complexFilter.push(`[1:a]volume=${(edits.musicVolume || 50) / 100}[m]`);
          complexFilter.push(`[0:a]${aFilter}[orig_a];[orig_a][m]amix=inputs=2:duration=first[aout]`);
          cmd.complexFilter(complexFilter, ['vout', 'aout']);
        } else {
          complexFilter.push(`[0:a]${aFilter}[aout]`);
          cmd.complexFilter(complexFilter, ['vout', 'aout']);
        }

        cmd.outputOptions([
             '-c:v libx264', 
             '-preset ultrafast', 
             '-c:a aac',
             '-hls_time 10',
             '-hls_list_size 0',
             '-f hls'
           ])
           .output(outPath)
           .on('end', () => resolve())
           .on('error', (err) => {
             console.error("FFmpeg error:", err);
             // Resolve anyway to fallback to raw video if processing fails
             resolve();
           })
           .run();
      });
      
      // If output file exists, use it
      if (fs.existsSync(outPath)) {
        videoUrl = '/uploads/' + outName;
      }
    }
  } catch (err) {
    console.error("Error processing video:", err);
  }

  try {
    const gradients = [
      'linear-gradient(135deg, #1a1a2e, #16213e)',
      'linear-gradient(135deg, #2b1055, #7597de)',
      'linear-gradient(135deg, #093028, #237A57)'
    ];
    const gradientPoster = gradients[Math.floor(Math.random() * gradients.length)];

    const query = `
      INSERT INTO series (id, creator_id, title, description, genre, tags, episodes, gradient_poster, video_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const values = [id, creatorId, title, description, genre, tags, episodes || 1, gradientPoster, videoUrl];

    await db.query(query, values);

    // Fetch the inserted series with creator info to emit via socket
    const getQuery = `
      SELECT 
        s.id, s.title, s.description, s.genre, s.tags, s.episodes, 
        s.free_episodes AS "freeEpisodes", s.price_per_episode AS "pricePerEpisode",
        s.currency, s.country, s.poster, s.gradient_poster AS "gradientPoster",
        s.views, s.rating, s.completion_rate AS "completionRate", s.video_url AS "video_url", s.created_at,
        u.id AS "creatorId", u.name AS "creatorName", u.handle AS "creatorHandle",
        u.avatar AS "creatorAvatar", u.verified AS "creatorVerified"
      FROM series s
      JOIN users u ON s.creator_id = u.id
      WHERE s.id = $1
    `;
    const result = await db.query(getQuery, [id]);
    
    if (result.rows.length > 0) {
      const row = result.rows[0];
      const newSeries = {
        id: row.id,
        title: row.title,
        description: row.description,
        genre: row.genre,
        tags: row.tags || [],
        episodes: row.episodes,
        freeEpisodes: row.freeEpisodes,
        pricePerEpisode: row.pricePerEpisode,
        currency: row.currency,
        country: row.country,
        poster: row.poster,
        gradientPoster: row.gradientPoster,
        views: row.views,
        rating: row.rating,
        completionRate: row.completionRate,
        video_url: row.video_url,
        createdAt: row.created_at,
        creator: {
          id: row.creatorId,
          name: row.creatorName,
          handle: row.creatorHandle,
          avatar: row.creatorAvatar,
          verified: row.creatorVerified
        }
      };
      // Emit real-time event
      io.emit('new_series', newSeries);
    }

    res.status(201).json({ success: true, id, videoUrl });
  } catch (err) {
    console.error('Error creating series:', err);
    res.status(500).json({ error: 'Failed to create series' });
  }
});

// Auth Login Simulation (Fallback)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Mock login: always return our mock user Zuri
    const result = await db.query('SELECT * FROM users WHERE id = $1', ['u1']);
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Google Authentication
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Verify the Google JWT token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;
    
    // Check if user exists in our DB by email
    let result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = result.rows[0];
    
    if (!user) {
      // Create new user
      const userId = 'u_' + Math.random().toString(36).substr(2, 9);
      const handle = '@' + email.split('@')[0] + Math.floor(Math.random() * 1000);
      
      const insertQuery = `
        INSERT INTO users (id, name, handle, email, avatar, country, premium, verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const insertValues = [userId, name, handle, email, picture, 'KE', false, true];
      const insertResult = await db.query(insertQuery, insertValues);
      user = insertResult.rows[0];
    }
    
    // Generate our own JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
    
    res.json({ token, user });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
});

// --- Pesapal Payment Routes ---
const pesapal = require('./pesapal');

// Cached IPN notification_id
let cachedIpnId = null;

async function getOrRegisterIPN() {
  if (cachedIpnId) return cachedIpnId;
  
  // Check DB for existing registration
  const existing = await db.query('SELECT notification_id FROM pesapal_ipn ORDER BY created_at DESC LIMIT 1');
  if (existing.rows.length > 0) {
    cachedIpnId = existing.rows[0].notification_id;
    return cachedIpnId;
  }

  // Register new IPN
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
  const ipnUrl = `${backendUrl}/api/payments/ipn`;
  const ipnId = await pesapal.registerIPN(ipnUrl);
  
  await db.query(
    'INSERT INTO pesapal_ipn (notification_id, url) VALUES ($1, $2) ON CONFLICT (notification_id) DO NOTHING',
    [ipnId, ipnUrl]
  );
  
  cachedIpnId = ipnId;
  return ipnId;
}

// POST /api/payments/initiate — Start a Pesapal payment
app.post('/api/payments/initiate', async (req, res) => {
  try {
    const { seriesId, episode, amount, currency, phone, email, firstName, lastName } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const orderId = 'vuna_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const userId = 'u1'; // hardcoded for now
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';
    const callbackUrl = `${frontendUrl}/#payment-callback?order=${orderId}`;
    
    // Get or register IPN
    const notificationId = await getOrRegisterIPN();
    
    // Submit order to Pesapal
    const pesapalResponse = await pesapal.submitOrder({
      orderId,
      amount,
      currency: currency || 'KES',
      description: `VunaShorts — Unlock Episode ${episode || '?'} of ${seriesId || 'series'}`,
      callbackUrl,
      notificationId,
      billing: {
        email: email || 'user@vunashorts.com',
        phone: phone || '',
        firstName: firstName || 'VunaShorts',
        lastName: lastName || 'User',
        countryCode: currency === 'NGN' ? 'NG' : currency === 'ZAR' ? 'ZA' : currency === 'GHS' ? 'GH' : 'KE'
      }
    });

    // Save payment record
    await db.query(
      `INSERT INTO payments (id, user_id, series_id, episode, amount, currency, status, pesapal_tracking_id, pesapal_redirect_url, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        orderId, userId, seriesId, episode || 1, amount, currency || 'KES',
        'pending', pesapalResponse.order_tracking_id,
        pesapalResponse.redirect_url, `Episode ${episode} unlock`
      ]
    );

    console.log('[Payment] Order created:', orderId, '-> Pesapal tracking:', pesapalResponse.order_tracking_id);

    res.json({
      success: true,
      orderId,
      trackingId: pesapalResponse.order_tracking_id,
      redirectUrl: pesapalResponse.redirect_url
    });
  } catch (err) {
    console.error('[Payment] Initiate error:', err.message);
    res.status(500).json({ error: 'Failed to initiate payment', details: err.message });
  }
});

// GET /api/payments/ipn — Pesapal IPN callback (webhook)
app.get('/api/payments/ipn', async (req, res) => {
  try {
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.query;
    console.log('[IPN] Received:', { OrderTrackingId, OrderMerchantReference, OrderNotificationType });

    if (OrderTrackingId) {
      // Check transaction status with Pesapal
      const status = await pesapal.getTransactionStatus(OrderTrackingId);
      console.log('[IPN] Transaction status:', status);

      const paymentStatus = status.payment_status_description === 'Completed' ? 'completed'
        : status.payment_status_description === 'Failed' ? 'failed'
        : 'pending';

      // Update our DB
      await db.query(
        `UPDATE payments SET status = $1, payment_method = $2, updated_at = NOW() WHERE pesapal_tracking_id = $3`,
        [paymentStatus, status.payment_method || 'unknown', OrderTrackingId]
      );

      // Emit real-time event to frontend
      io.emit('payment_update', {
        trackingId: OrderTrackingId,
        orderId: OrderMerchantReference,
        status: paymentStatus,
        method: status.payment_method
      });
    }

    res.json({ orderNotificationType: OrderNotificationType, orderTrackingId: OrderTrackingId, orderMerchantReference: OrderMerchantReference, status: 200 });
  } catch (err) {
    console.error('[IPN] Error:', err.message);
    res.status(500).json({ error: 'IPN processing failed' });
  }
});

// GET /api/payments/status/:trackingId — Check payment status
app.get('/api/payments/status/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    
    // Check local DB first
    const local = await db.query('SELECT * FROM payments WHERE pesapal_tracking_id = $1 OR id = $2', [trackingId, trackingId]);
    
    // Also check with Pesapal for live status
    let pesapalStatus = null;
    try {
      const pesapalTrackingId = local.rows[0]?.pesapal_tracking_id || trackingId;
      pesapalStatus = await pesapal.getTransactionStatus(pesapalTrackingId);
      
      // Update local record if status changed
      if (pesapalStatus && local.rows[0]) {
        const newStatus = pesapalStatus.payment_status_description === 'Completed' ? 'completed'
          : pesapalStatus.payment_status_description === 'Failed' ? 'failed'
          : 'pending';
        
        if (local.rows[0].status !== newStatus) {
          await db.query(
            'UPDATE payments SET status = $1, payment_method = $2, updated_at = NOW() WHERE id = $3',
            [newStatus, pesapalStatus.payment_method || 'unknown', local.rows[0].id]
          );
        }
      }
    } catch (e) {
      console.log('[Payment] Pesapal status check failed, using local:', e.message);
    }

    res.json({
      local: local.rows[0] || null,
      pesapal: pesapalStatus
    });
  } catch (err) {
    console.error('[Payment] Status check error:', err.message);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

// GET /api/payments/history — Get user payment history
app.get('/api/payments/history', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC', ['u1']);
    res.json(result.rows);
  } catch (err) {
    console.error('[Payment] History error:', err.message);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Watch Party Events
  socket.on('join_party', (partyId) => {
    socket.join(partyId);
    console.log(`Socket ${socket.id} joined party ${partyId}`);
  });

  socket.on('party_chat', (data) => {
    io.to(data.partyId).emit('party_chat', data);
  });

  socket.on('party_react', (data) => {
    io.to(data.partyId).emit('party_react', data);
  });
  
  socket.on('party_sync', (data) => {
    // Only allow host to sync
    socket.to(data.partyId).emit('party_sync', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`VunaShorts Backend API running on http://localhost:${PORT}`);
});
