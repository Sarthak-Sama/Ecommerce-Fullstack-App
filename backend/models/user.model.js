const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    },
    shop: {
        type: String,
        required: function() {
        return this.role === 'seller';
    }},
    isAdmin: {
        type: Boolean,
        default: false
    }
})




module.exports = mongoose.model('User', userSchema);

