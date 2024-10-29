const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderID: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentID: {
        type: String,
        required: true,
        unique: true
    },
    signature: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        default: 'INR'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    method: {
        type: String,
        required: true,
        enum: ['Card', 'UPI', 'Net Banking', 'Cash on delivery']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },

    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
