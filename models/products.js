/*jslint node: true, indent: 2,nomen:true */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  barCode: {
    type: String,
    required: true,
    unique: true
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
    min: 0
  },
  lastStocked: {
    type: Date,
    required: true
  }
});


module.exports = mongoose.model('Products', productSchema);
