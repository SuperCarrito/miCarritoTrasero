var cart = require('./cartProduct'),
products = require('./products');

module.exports = function (app) {
  app.use('/v1/carrito', cart);
  app.use('/v1/productos',products);
};
