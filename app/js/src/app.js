var Portfolio = require('./portfolio');
var Visualization = require('./visualization');

var Timeline = require('dhaak-anim').Timeline;
var Tween = require('dhaak-anim').Tween;
var Easing = require('dhaak-anim').Easing;

var Animations = require('./animations/animations')

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
    var tween = new Tween( { 
        duration: 500,
        delay: 500,
        node:this.banner
    } );

    var update = function(node, c) { 
        this.banner.style.opacity = c;
        
        this.banner.style.top = c[1] + '%';
        this.banner.style.opacity = c[0];
        this.enterButton.style.opacity = [2];
    }.bind(this, 'a');

    tween.ease(Easing.easeInQuad)
         .curve(new Tween.Line([-1,30, -10],[1, 40, 1]))
         .update( update )
         .play()
};

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
