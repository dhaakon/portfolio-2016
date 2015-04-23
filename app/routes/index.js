var routes = function(app){
  var userObject = {};

  var store = {
    index : require('./includes/index')(userObject),
    art : require('./includes/art')(userObject),
    compositions: require('./includes/compositions')(userObject),
    json:require('./includes/json')(userObject)
  };

  app.get('/', store.index );
  app.get('/art', store.art );
  app.get('/compositions', store.compositions );
  app.get('/json/:type', store.json );
}

module.exports = routes;
