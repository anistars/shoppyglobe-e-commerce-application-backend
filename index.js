const express = require('express');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/shoppyglobe'; 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // You can start defining schemas and models here
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });