const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('Cart', cartSchema);