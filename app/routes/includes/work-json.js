var path = require('path');
var fs = require('fs');


var workJson = function(userObject){
    var _jsonPath = path.join(__dirname, '../../json/work.json');
    var json = require( _jsonPath );

    console.log(_jsonPath);
    console.log(json);
    //var json = require( path.join( __dirname, '../../json/work.json'));
    var route = function(req, res){
        res.json(json)
    }
    return route;
}

module.exports = workJson;
