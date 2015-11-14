/*jslint node: true, indent: 2,nomen:true */
var mongoose = require('mongoose');
var productObject = mongoose.Schema({
  barCode: {
    type: String,
    required: true,
    unique: true
  },
  numberBought: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    requried: true,
    min: 0
  }
});

var shoppingCartSchema = mongoose.Schema({
  products: [productObject],
  cartId: {
    type: String,
    required: true,
    unique: true
  },
  totalPrice: {
    type: Number,
    required: true,
    unique: true,
    min: 0
  },
  hasPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  lastUsed: {
    type: Date,
    required: true,
    default: Date.now
  }
});



module.exports = mongoose.model('shoppingCart', shoppingCartSchema);
