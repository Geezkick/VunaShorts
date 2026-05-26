require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDB() {
  const client = await pool.connect();
  try {
    console.log('Connected to Neon PostgreSQL. Initializing tables...');
    await client.query('BEGIN');
    
    // Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        handle VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) UNIQUE,
        avatar VARCHAR(255),
        country VARCHAR(5),
        premium BOOLEAN DEFAULT FALSE,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Series Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS series (
        id VARCHAR(50) PRIMARY KEY,
        creator_id VARCHAR(50) REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        genre VARCHAR(50),
        tags JSONB,
        episodes INTEGER DEFAULT 1,
        free_episodes INTEGER DEFAULT 1,
        price_per_episode INTEGER DEFAULT 50,
        currency VARCHAR(10) DEFAULT 'KSh',
        country VARCHAR(5) DEFAULT 'KE',
        poster VARCHAR(255),
        gradient_poster VARCHAR(255),
        views VARCHAR(20) DEFAULT '0',
        rating VARCHAR(10) DEFAULT '0.0',
        completion_rate INTEGER DEFAULT 0,
        video_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure existing tables are updated
    await client.query(`ALTER TABLE series ADD COLUMN IF NOT EXISTS video_url VARCHAR(255);`);

    // Create Payments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(id),
        series_id VARCHAR(50),
        episode INTEGER,
        amount NUMERIC(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'KES',
        payment_method VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        pesapal_tracking_id VARCHAR(255),
        pesapal_redirect_url TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Pesapal IPN Registration Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pesapal_ipn (
        id SERIAL PRIMARY KEY,
        notification_id VARCHAR(255) UNIQUE,
        url TEXT NOT NULL,
        ipn_type VARCHAR(20) DEFAULT 'GET',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed Data if Users table is empty
    const res = await client.query('SELECT count(*) FROM users');
    if (parseInt(res.rows[0].count) === 0) {
      console.log('Seeding initial database data...');
      
      await client.query(`
        INSERT INTO users (id, name, handle, avatar, country, premium, verified)
        VALUES 
        ('u1', 'Zuri', '@zuri_creates', 'Z', 'KE', TRUE, TRUE),
        ('u2', 'Kwame', '@kwame_studios', 'K', 'GH', FALSE, TRUE)
      `);

      await client.query(`
        INSERT INTO series (id, creator_id, title, description, genre, tags, episodes, free_episodes, price_per_episode, gradient_poster, views, rating)
        VALUES 
        ('s1', 'u1', 'The Nairobi Hustle', 'A story of ambition in the city in the sun.', 'Drama', '["drama", "trending", "nairobi"]', 12, 2, 50, 'linear-gradient(135deg, #1a1a2e, #16213e)', '1.2M', '4.8'),
        ('s2', 'u2', 'Accra Nights', 'Romance and betrayal.', 'Romance', '["romance", "new"]', 8, 1, 50, 'linear-gradient(135deg, #2b1055, #7597de)', '500K', '4.5')
      `);
      console.log('Seeding complete.');
    }
    
    await client.query('COMMIT');
    console.log('Database initialization successful.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database:', err);
  } finally {
    client.release();
  }
}

// Automatically init DB on module load
initDB();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
