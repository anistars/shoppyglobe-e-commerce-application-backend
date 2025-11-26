const cartModel = require('../models/Cart');
const Product = require('../models/Product');

// Controller to get all cart items
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await cartModel.find();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to add an item to the cart
exports.addItemToCart = async (req, res) => {
    
    const { productId, quantity } = req.body;    
    const products = await Product.findById(productId);
    console.log('Products', products.price);
    try {
        const totalPrice = products.price * quantity;
        const cartItem = await cartModel.create({ productId, quantity, totalPrice });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await cartModel.findByIdAndDelete(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Controller to update the quantity of a cart item
exports.updateCartItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const cartItem = await cartModel.findById(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
