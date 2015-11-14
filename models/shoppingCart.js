/*jslint node: true, indent: 2,nomen:true */
var mongoose = require('mongoose');

var shoppingCartSchema = mongoose.Schema({
    products: Array,
    price: Number,
    discount: Number,
    stock: Number
  });


module.exports = mongoose.model('Products', productSchema);
