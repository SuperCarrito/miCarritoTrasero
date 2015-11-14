var cart = require('./cartProduct');

module.exports = function (app) {
  app.use('/v1/carrito', cart);
  
};
