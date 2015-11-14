var express = require('express'),
  router = express.Router(),
  carrito = require('../models/shoppingCart'),
  products = require('../models/products');

router.get('/:cartId', function (req, res) {
  carrito.find(req.params.cartId,
    function (err,carritoNew) {
      if(err){
        res.sendStatus(404);
        return console.error(err);
      }
      res.sendStatus(200);
      res.send(carritoNew);
  });
});

router.patch('/:cartId/:barCode?q', function (req, res) {
  carrito.find(req.params.cartId,
    function (err,carritoNew) {
      if(err){
        res.sendStatus(404);
        return console.error(err);
      }
      res.sendStatus(200);
      res.send(carritoNew);
  });
});
module.exports = router;
