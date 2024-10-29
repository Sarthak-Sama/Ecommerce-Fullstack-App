const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ["womenswear", "menswear", "kids"],
        required:true
    },
    discount:{
        type: Number,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    images: [{
        type: String,
    }],
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
