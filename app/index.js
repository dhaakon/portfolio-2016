var express = require('express'),
    app = express(),
    path = require('path');

var http = require('http'),
    port = process.env.PORT || 5000,
    server = http.createServer( app );

var __Sonos = require('sonos').Sonos,
    sonos_ip = '172.30.215.240',
    sonos = new __Sonos( sonos_ip );

var noop = function(){};

app.use( express.static( path.join( __dirname, '/public' ) ) );

server.listen( port, app.get('ip'), function(){
  console.log('Server started on port: ' + port);           
  sonos.stop( noop );
  console.log( sonos.currentTrack(noop) );
} );
