var express = require('express'),
  router = express.Router(),
  products = require('../models/products');

router.post('/', function(req, res) {
  var newProduct = new products({
    name: req.body.name,
    barCode: req.body.barCode,
    price: req.body.price || 10,
    discount: req.body.discount || 1,
    stock: req.body.stock || 0
  });

  newProduct.save(function(err) {
    if (err) {
      return console.error(err);
    }
    res.status(200)
      .send({
        saved: true,
        object: newProduct
      });
  });
});

router.get('/', function(req, res) {
  products.find(
    req.query,
    function(err, productos) {
      if (err) {
        return console.error(err);
      }
      res.send(productos);
    }
  );
});

module.exports = router;
