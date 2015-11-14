var cart = require('./cartProduct'),
products = require('./products'),
stories = require('./shopHistory');

module.exports = function (app) {
  app.use('/v1/historial', stories);
  app.use('/v1/carrito', cart);
  app.use('/v1/productos',products);
};
