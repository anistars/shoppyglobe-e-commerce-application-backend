const express = require('express');
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// ================== API REQUEST LOGGING (Assignment Requirement) ==================
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// ================== ROUTES ==================
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);      // Routes already use protect middleware
app.use('/api/auth', authRoutes);

// ================== MONGODB CONNECTION ==================
mongoose.connect('mongodb://localhost:27017/shoppyglobe')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// ================== START SERVER ==================
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
