import { Brush } from './modules/brush.jsx';
import { Scroll } from './modules/scroll.jsx';

let _ = require('underscore');

let $ = require('jquery');

var raf;

var _canvas = document.querySelectorAll('canvas')[0];
var _ctx = _canvas.getContext('2d');
let endtime = 100000;

var count = 0;

var dt = 0;

class App{
  constructor(){
    console.log(_canvas, _ctx);

    this.brush = new Brush( _ctx );

    this.setupScroll();

    this.loop();
  }

  setupScroll(){
    this.scroll = new Scroll();

    let elToScroll = document.querySelectorAll('.project');
    let iter = ( el, idx )=>{
      //console.log(el);
      //console.log(idx);
    
      //console.log('adding scene');
      this.scroll.addScene( $(el) );
    }

    _.each( elToScroll, iter );
  }

  loop(){
    count++

    let t = Date.now();

    if ( count < endtime ){
      this.draw();
      
      raf = requestAnimationFrame( this.loop.bind( this ) );
    }else{
      cancelAnimationFrame( raf );
    }
    
    dt = t;
  }

  draw(){
    this.brush.paint()
  }
}


new App();

export { App };
