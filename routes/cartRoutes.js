const express = require('express');
const routes = express.Router();

const cartController = require('../controllers/cartController');

// Route to add an item to the cart
routes.post('/add', cartController.addItemToCart);
// Route to remove an item from the cart
routes.delete('/remove', cartController.removeItemFromCart);
// Route to update the quantity of a cart item
routes.put('/update', cartController.updateCartItemQuantity);
module.exports = routes;