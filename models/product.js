const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    price: { type: 'number', required: true, min: 0 },
    category: {
        type: 'String', enum: ['gaming', 'indoors', 'electronics'],
        lowercase: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;