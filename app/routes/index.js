var routes = function(app){
  var userObject = {};

  var store = {
    index : require('./includes/index')(userObject),
    art : require('./includes/art')(userObject),
    compositions: require('./includes/compositions')(userObject),
    workJson: require('./includes/work-json')(userObject)
  };

  app.get('/', store.index );
  app.get('/art', store.art );
  app.get('/work-json', store.workJson );
  app.get('/compositions', store.compositions );
}

module.exports = routes;
