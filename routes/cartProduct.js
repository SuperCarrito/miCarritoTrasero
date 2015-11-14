var express = require('express'),
  router = express.Router(),
  carrito = require('../models/shoppingCart'),
  products = require('../models/products');

//==ROUTES
router.get('/:cartId', function(req, res) {
  carrito.find(req.params.cartId,
    function(err, carritoNew) {
      if (err) {
        res.sendStatus(404);
        return console.error(err);
      } else {
        res.send(carritoNew);
      }
    });
});
router.get('/', function(req, res) {
  carrito.find(req.params,
    function(err, carritoNew) {
      if (err) {
        res.sendStatus(404);
        return console.error(err);
      } else {
        res.send(carritoNew);
      }
    });
});

router.patch('/:cartId/:codebar', function(req, res) {
  carrito.findOneAndUpdate(req.params.cartId, {
      $push: {
        products: {
          barCode: req.params.codebar,
          numberBought: req.query.q || 1,
          price: getPrice(req.params.barCode)
        }
      }
    },
    function(err, carritoNew) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      } else {
        res.send(carritoNew);
      }
    });
});

router.post('/alta', function(req, res) {
  var newCarrito = new carrito({
    cartId: makeid()
  });
  newCarrito.save(function(err) {
    if (err) {
      return console.error(err);
    } else {
      res.status(200)
        .send({
          saved: true,
          object: newCarrito
        });

    }
  });
});
//===Helper Functions
function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function getPrice(barcode) {
  console.log("getprice test");
  products.find(barcode,
    function(err, producto) {
      if (err) return console.error(err);
      return(producto.price);
    });
}

//============DEBUG

router.delete('/', function(req, res) {
  carrito.remove(function(err) {
    if (err) {
      return console.error(err);
    }
    res.send({
      succes: true,
      message: 'Everything was deleted'
    });
  });
});
module.exports = router;
