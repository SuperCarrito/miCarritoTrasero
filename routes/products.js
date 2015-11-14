var express = require('express'),
  router = express.Router(),
  products = require('../models/products');

router.post('/', function(req, res) {
  var newProduct = new products({
    name: req.body.name,
    barCode: req.body.barCode,
    price: req.body.price ,
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


router.patch('/:barcode', function (req, res) {
  products
    .findOneAndUpdate(req.params.barcode,
      req.body,
      function (err, productito) {
        if (err) {
          return console.error(err);
        }
        res.send({
          success: true,
          message: 'product with barcode: ' + req.params.barcode,
          updatedProdcut: productito
        });
      });
});


router.delete('/:barcode', function (req, res) {
  products
    .findOneAndUpdate(req.params.barcode,
      req.body,
      function (err, productito) {
        if (err) {
          return console.error(err);
        }
        res.send({
          success: true,
          message: 'product with barcode: ' + req.params.barcode,
          updatedProdcut: productito
        });
      });
});

router.delete('/:barCode', function (req, res) {
  products.remove({
    _id: req.params._id
  },
    function (err, productsTemp) {
      if (err) {
        return console.error(err);
      }
      if (productsTemp.result === 0) {
        res.send({
          success: true,
          message: 'No products with that barcode found'
        });
      } else {
        res.send({
          success: true,
          message: 'Product with barcode: ' + req.params.barcode
        });
      }
    });
});

router.get('/:barcode', function(req, res) {
  products.find(
    {"barCode" : req.params.barcode
    },
    function(err, productos) {
      if (err) {
        return console.error(err);
      }
      res.send(productos);
    }
  );
});

module.exports = router;
