const express = require('express');
const routes = express.Router();
const{ getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Route to get all products
routes.get('/', getAllProducts);

// Route to get a single product by ID
routes.get('/:id', getProductById);

// Route to create a new product
routes.post('/', createProduct);

// Route to update an existing product
routes.put('/:id', updateProduct);

// Route to delete a product
routes.delete('/:id', deleteProduct);

module.exports = routes;