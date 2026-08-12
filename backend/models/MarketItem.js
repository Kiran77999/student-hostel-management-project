const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Books & Study Material', 'Electronics', 'Dorm Essentials', 'Clothing', 'Furniture', 'Other']
    },
    condition: {
        type: String,
        required: true,
        enum: ['Like New', 'Good', 'Fair', 'Poor']
    },
    images: [{
        type: String // URLs or base64
    }],
    location: {
        type: String,
        required: true,
        default: 'The Quad / Library'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Sold', 'Draft'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MarketItem', marketItemSchema);
