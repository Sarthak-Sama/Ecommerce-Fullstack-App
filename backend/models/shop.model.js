const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("Shop", shopSchema)
