var Portfolio = require('./portfolio');
var Visualization = require('./visualization');

var App = function(){
    this.path = '/json/work/';
    this.banner = document.getElementById('header');
    this.socialIcons = document.querySelectorAll('.social-buttons')[0];
    this.enterButton = document.querySelectorAll('.enterBtn')[0];

    this.animateBanner();

    this.init();
};

var proto = App.prototype = {};

proto.animateBanner = function(){
    setTimeout(
        function(){
            this.banner.style.opacity = 1;
            this.banner.style.top = '40%';
        }.bind(this),
        500
    );
}

proto.init = function(){
    this.createPortfolio();
    this.createVisualization();

    this.setupListeners();
};

proto.createVisualization = function(){
    this.visualization = new Visualization();
};

proto.onWindowResize = function(event){
};

proto.setupListeners = function(){
    window.onresize = this.onWindowResize.bind(this);
    this.enterButton.onclick = function(){
        this.banner.style.opacity = 0;

        this.visualization.start();

        this.enterButton.onclick = null;
    }.bind(this);
};

proto.onDataReceived = function( data ){
    this.portfolio = new Portfolio(data);
};

proto.createPortfolio = function(){
    d3.json( this.path, this.onDataReceived.bind(this) );
};

module.exports = App;
