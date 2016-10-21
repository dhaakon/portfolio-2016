var express = require("express");
var router = express.Router();


var serveIndex = require('serve-index');
var index = serveIndex('public/old-portfolio', {'icons': true})


router.get( '/', function( req, res ){
  res.render("index");
});

router.get( '/old-portfolio/', function( req, res ){
  index( req, res, function(){} );
});

module.exports = router;
