/*jslint node: true, indent: 2,nomen:true */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barCode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: Number,
  stock: {
    type: Number,
    required: true,
    min: 0,
    default:1
  },
  lastStocked: {
    type: Date
  }
});


module.exports = mongoose.model('products', productSchema);
