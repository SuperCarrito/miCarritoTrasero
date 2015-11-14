/*jslint node: true, indent: 2,nomen:true */
'use strict';
// BASE SETUP
// =============================================================================
var express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  router = express.Router(),
  myRoutes = require('./routes/index'),
  port = process.env.PORT || 80; // set our port

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(bodyParser.json());
// ========  View ==========0
app.engine('html', require('ejs').renderFile);

// ROUTES
// =============================================================================

router.use(function(next) {
  next();
});
myRoutes(app);

// START THE SERVER
// =============================================================================
app.listen(port, console.log('Server is running in port: ' + port));
