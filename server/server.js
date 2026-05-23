require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const db = require('./database');

const app = express();
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
        s.views, s.rating, s.completion_rate AS "completionRate", s.created_at,
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
app.post('/api/series', async (req, res) => {
  const { title, description, genre, episodes } = req.body;
  const creatorId = 'u1'; // Hardcoded to Zuri for now
  const id = 's' + Date.now();
  const tags = JSON.stringify(['new', (genre || '').toLowerCase()]);
  
  try {
    const gradients = [
      'linear-gradient(135deg, #1a1a2e, #16213e)',
      'linear-gradient(135deg, #2b1055, #7597de)',
      'linear-gradient(135deg, #093028, #237A57)'
    ];
    const gradientPoster = gradients[Math.floor(Math.random() * gradients.length)];

    const query = `
      INSERT INTO series (id, creator_id, title, description, genre, tags, episodes, gradient_poster)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;
    const values = [id, creatorId, title, description, genre, tags, episodes || 1, gradientPoster];

    await db.query(query, values);

    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error('Error creating series:', err);
    res.status(500).json({ error: 'Failed to create series' });
  }
});

// Auth Login Simulation
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Mock login: always return our mock user Zuri
    const result = await db.query('SELECT * FROM users WHERE id = $1', ['u1']);
    const user = result.rows[0];
    res.json({ token: 'mock-jwt-token-123', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.listen(PORT, () => {
  console.log(`VunaShorts Backend API running on http://localhost:${PORT}`);
});
