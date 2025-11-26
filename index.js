const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoURI = 'mongodb://localhost:27017/shoppyglobe'; 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const JWT_SECRET = "your_jwt_secret_key";

app.set("jwt-secret", JWT_SECRET);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // You can start defining schemas and models here
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
