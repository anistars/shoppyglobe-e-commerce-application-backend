const Cart = require('../models/Cart');
const Product = require('../models/Product');

// ===================== GET ALL CART ITEMS =====================
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.user._id })
            .populate("productId");

        return res.status(200).json(cartItems);
    } catch (error) {
        console.error("Get Cart Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// ===================== ADD ITEM TO CART =====================
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        if (quantity <= 0) {
            return res.status(400).json({ error: "Quantity must be greater than zero" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        let cartItem = await Cart.findOne({
            userId: req.user._id,
            productId
        });

        if (cartItem) {
            const updatedQty = cartItem.quantity + quantity;

            if (product.stock < updatedQty) {
                return res.status(400).json({ error: "Insufficient stock" });
            }

            cartItem.quantity = updatedQty;
            cartItem.totalPrice = updatedQty * product.price;
            await cartItem.save();

            return res.status(200).json(cartItem);
        }

        const newItem = await Cart.create({
            userId: req.user._id,
            productId,
            quantity,
            totalPrice: product.price * quantity
        });

        return res.status(201).json(newItem);

    } catch (error) {
        console.error("Add Cart Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// ===================== REMOVE CART ITEM =====================
exports.removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Cart.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!deleted) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        return res.status(200).json({ message: "Cart item removed successfully" });
    } catch (error) {
        console.error("Remove Cart Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// ===================== UPDATE CART ITEM QUANTITY =====================
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        const product = await Product.findById(cartItem.productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        cartItem.quantity = quantity;
        cartItem.totalPrice = quantity * product.price;
        await cartItem.save();

        return res.status(200).json(cartItem);

    } catch (error) {
        console.error("Update Cart Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
