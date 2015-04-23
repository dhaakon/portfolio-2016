var express = require('express'),
    app = express(),
    path = require('path');

var http = require('http'),
    port = process.env.PORT || 5000;

var noop = function(){};

var config = require( './settings/config.json' );
var fs = require( 'fs' );

app.set('port', port);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

var oneDay = 86400000;
app.use( express.static( path.join( __dirname, '../public' ) ) );
app.use(express.static( path.join( __dirname, '../public/images' ), { maxAge: oneDay } ) );

require( './routes/index' )( app );
//app.use(app.router);
//
var server = http.createServer( app );
server.listen( port, app.get('ip'), function(){
  console.log( 'Server started on port: ' + port );
} );
