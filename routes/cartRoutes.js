const express = require('express');
const routes = express.Router();

const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Get all cart items
routes.get('/', protect, cartController.getAllCartItems);

// Add item
routes.post('/', protect, cartController.addItemToCart);

// Update item quantity
routes.put('/:id', protect, cartController.updateCartItemQuantity);

// Delete item
routes.delete('/:id', protect, cartController.removeItemFromCart);

module.exports = routes;
