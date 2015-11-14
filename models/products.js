/*jslint node: true, indent: 2,nomen:true */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    barCode: String,
    price: Number,
    discount: Number,
    stock: Number
  });


module.exports = mongoose.model('Products', productSchema);
