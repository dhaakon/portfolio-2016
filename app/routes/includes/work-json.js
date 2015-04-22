var path = require('path');

var workJson = function(userObject){
    var json = require( path.join( __dirname, '../../json/work.json'));
    var route = function(req, res){
        res.send(json)
    }
    return route;
}

module.exports = workJson;
