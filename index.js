const express = require('express');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/shoppyglobe'; 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();
app.use(express.json());
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
