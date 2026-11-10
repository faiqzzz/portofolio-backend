const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi eksplisit untuk menghindari jebakan IPv6 Supabase
const pool = new Pool({
  user: 'postgres',
  password: 'Balikpapan27062006!', // Password asli pakai tanda seru biasa di sini aman karena dipisah
  host: 'db.ddfmiqxmacudbkwuzydr.supabase.co',
  database: 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false },
  family: 4
});

// Endpoint feedbacks
app.post('/api/feedbacks', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!message) {
      return res.status(400).json({ status: 'fail', message: 'Message cannot be empty' });
    }

    const query = 'INSERT INTO feedbacks (name, message) VALUES ($1, $2) RETURNING *';
    const values = [name || 'Anonymous', message];
    
    const newFeedback = await pool.query(query, values);

    res.status(201).json({
      status: 'success',
      message: 'Feedback saved successfully',
      data: newFeedback.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});
  
// Rute utama untuk tes di browser
app.get('/', (req, res) => {
  res.send('Backend API is running smoothly!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));