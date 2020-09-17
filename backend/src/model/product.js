/**
 * IMPORTS
 */
const mongoose = require('mongoose');

/**
 * CODE
 */

// product schema
const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
});

/**
 * EXPORTS
 */
module.exports = mongoose.model('Product', productSchema);
