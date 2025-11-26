const express = require('express');
const routes = express.Router();

const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');


// Route to get all cart items
routes.get('/', protect, cartController.getAllCartItems);
// Route to add an item to the cart
routes.post('/add', protect, cartController.addItemToCart);
// Route to remove an item from the cart
routes.delete('/remove', protect, cartController.removeItemFromCart);
// Route to update the quantity of a cart item
routes.put('/update', protect, cartController.updateCartItemQuantity);
module.exports = routes;