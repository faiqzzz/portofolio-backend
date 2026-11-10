const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Inisialisasi Supabase Client (Lewat HTTPS, anti ribet SSL/Pooler)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint feedbacks
app.post('/api/feedbacks', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!message) {
      return res.status(400).json({ status: 'fail', message: 'Message cannot be empty' });
    }

    const { data, error } = await supabase
      .from('feedbacks')
      .insert([{ name: name || 'Anonymous', message }])
      .select();

    if (error) throw error;

    res.status(201).json({
      status: 'success',
      message: 'Feedback saved successfully',
      data: data[0]
    });
  } catch (err) {
    console.error('Supabase Error:', err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', details: err.message });
  }
});
  
// Rute utama untuk tes di browser
app.get('/', (req, res) => {
  res.send('Backend API is running smoothly!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));