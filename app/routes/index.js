var routes = function(app){
  var store = {
    index : require('./includes/index')
  };

  app.get('/', store.index );
}

module.exports = routes;
