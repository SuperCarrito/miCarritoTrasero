var express = require('express'),
  router = express.Router(),
  carrito = require('../models/shoppingCart'),
  stories = require('../models/shopHistory'),
  products = require('../models/products'),
  price, discount;

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
  getItemInfo(req.params.codebar);
  carrito.findOneAndUpdate(req.params.cartId, {
      $push: {
        products: {
          barCode: req.params.codebar,
          numberBought: req.query.q || 1,
          price: price
        }
      }
    },
    function(err, carritoNew) {
      updateTotal(req.params.cartId);
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      } else {
        res.send(carritoNew);
      }
    });
});

router.delete('/:cartId/:codebar', function(req, res) {
  carrito.findOneAndUpdate(req.params.cartId, {
      $pull: {
        products: {
          barCode: req.params.codebar
        }
      }
    },
    function(err, carritoNew) {
      updateTotal(req.params.cartId);
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

router.patch('/pay?', function(req, res) {
  carrito.findOneAndUpdate(req.query.cartId, {
      hasPaid: true
    },
    function(err, carritoNew) {
      if (err) {
        console.log("error");
        res.sendStatus(500);
        return console.error(err);
      } else {

       makeHistory_babe(carritoNew, req.params.name);
        carritoNew.totalPrice = 0;
        carritoNew.hasPaid = false;
        carritoNew.lastUsed = Date.now;
        carritoNew.products = {};

        carritoNew.save(function(error) {

          res.send("reset=true");
        });

      }
    });
});

//===Helper Functions
function updateTotal(carritoId) {
  carrito.find(carritoId, function(err, carritoNew) {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    } else {
      var newCart = {
        totalPrice: countMuneyz(carritoNew[0].products)
      };
      carrito.findByIdAndUpdate(carritoNew[0]._id, newCart,
        function(err, result) {
          if (err) return console.error(err);
        });

    }
  });
}

function countMuneyz(products) {
  var currentTotal = 0;
  for (var i = 0; i < products.length; i++) {
    getItemInfo(products[i].barCode);
    currentTotal += (products[i].numberBought * price) * discount;
  }

  return currentTotal;
}

function getItemInfo(barcode) {
  products.find({"barCode": barcode} ,
    function(err, producto) {
      if (err) return console.error(err);
      price = producto[0].price;
      discount = (producto[0].discount);
    });
}

function makeHistory_babe(history, name) {
  var newHistory = new stories({
    shoppingCart: history[0],
    name: name
  });

  newHistory.save(function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("saving");
    }
  });
}

function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
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
