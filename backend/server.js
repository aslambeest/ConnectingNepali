require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Static file serving for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ Serve React frontend (SPA)
app.use(express.static(path.join(__dirname, 'frontend/dist'))); // Adjust path if needed

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// ✅ MongoDB connection and server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
