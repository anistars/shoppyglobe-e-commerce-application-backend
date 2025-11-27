const cartModel = require('../models/Cart');
const Product = require('../models/Product');


// ===================== GET ALL CART ITEMS =====================
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await cartModel
            .find({ userId: req.user.id })
            .populate('productId');

        return res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// ===================== ADD ITEM TO CART =====================
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock available" });
        }

        const existing = await cartModel.findOne({
            userId: req.user.id,
            productId
        });

        if (existing) {
            const newQty = existing.quantity + quantity;

            if (product.stock < newQty) {
                return res.status(400).json({ error: "Insufficient stock available" });
            }

            existing.quantity = newQty;
            existing.totalPrice = newQty * product.price;
            console.log("Updating existing cart item:", existing);
            await existing.save();

            return res.status(200).json(existing);
        }

        const newItem = await cartModel.create({
            userId: req.user.id,
            productId,
            quantity,
            totalPrice: quantity * product.price
        });

        return res.status(201).json(newItem);

    } catch (error) {
        console.error("Cart Add Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// ===================== REMOVE CART ITEM =====================
exports.removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await cartModel.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        return res.status(200).json({ message: "Cart item removed successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// ===================== UPDATE CART ITEM QUANTITY =====================
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await cartModel.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        const product = await Product.findById(cartItem.productId);

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock available" });
        }

        cartItem.quantity = quantity;
        cartItem.totalPrice = product.price * quantity;
        await cartItem.save();

        return res.status(200).json(cartItem);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
