var index = function( userObject ){
    var route = function( req, res ){
      res.render('index', userObject );
    };

    return route;
}

module.exports = index;
