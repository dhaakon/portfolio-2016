var path = require('path');
var fs = require('fs');


var workJson = function(userObject){

    //var json = require( path.join( __dirname, '../../json/work.json'));
    var route = function(req, res){
        var type = req.params.type;
        var _jsonPath = path.join(__dirname, '../../json/' + type + '.json');
        var json = require( _jsonPath );
        res.json(json)
    }
    return route;
}

module.exports = workJson;
