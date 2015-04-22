var Portfolio = require('./portfolio');

var App = function(){
    this.path = '/work-json/';

    this.init();
}

var proto = App.prototype = {};

proto.init = function(){
    this.createPortfolio();
    this.setupListeners();
};

proto.onWindowResize = function(event){
};

proto.setupListeners = function(){
    window.onresize = this.onWindowResize.bind(this);
};

proto.onDataReceived = function( data ){
    this.portfolio = new Portfolio(data);
};

proto.createPortfolio = function(){
    d3.json( this.path, this.onDataReceived.bind(this) );
};

module.exports = App;
