var mongoose = require('mongoose');

var shoppingHistorySchema = mongoose.Schema({
  shoppingCart: {
    type: Object
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('shoppingHistory', shoppingHistorySchema);
