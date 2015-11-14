var express = require('express'),
  router = express.Router(),
  stories = require('../models/shopHistory');



router.get('/', function(req, res) {
  stories.find(
    req.query,
    function(err, story) {
      if (err) {
        return console.error(err);
      }
      res.send(story);
    }
  );
});

module.exports = router;
