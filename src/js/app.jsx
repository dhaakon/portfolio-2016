import { Brush } from './modules/brush.jsx';
import { Scroll } from './modules/scroll.jsx';
import { VideoModal } from './modals/video_modal.jsx';

let _ = require('underscore');

let $ = require('jquery');

var raf;

var _canvas = document.querySelectorAll('canvas')[0];
var _ctx = _canvas.getContext('2d');
let endtime = 100000;

var count = 0;

var dt = 0;
let $win = $(window);

class App{
  constructor(){
    console.log(_canvas, _ctx);

    this.brush = new Brush( _ctx );
    this.raf = null;

    this.videoModal = new VideoModal();
    this.resizeHandler();
    this.setupScroll();

    this.loop();
    this.setupVideos();

    this.setupListeners();
  }

  setupListeners(){

    $(window).on('resize', this.resizeHandler.bind(this) );
  }

  resizeHandler(){
      let _width = $win.width();

      if( _width < 1024 ){
        this.isDeviceMode = true;
      }
  }

  setupVideos(){
    var _videos = $('.poster');

    let fn = (event)=>{
      //console.log(event.currentTarget);
      //new VideoModal( src );
      let src = $( event.currentTarget ).data('src');
      
      this.videoModal.open( src );
    }

    _videos.click( fn );
  }

  setupScroll(){
    this.scroll = new Scroll( this.isDeviceMode );
    this.scroll.addListener('bg_change', (e)=>{
      //console.log(e);
    });
    this.scroll.addListener('splash_over', (e)=>{
      $('.sketchpad').css({'transitionDelay': '0ms'});
      cancelAnimationFrame( this.raf );
      //console.log(e);
    });

    this.scroll.addListener('splash_start', (e)=>{
      $('.sketchpad').css({'transitionDelay':'500ms'});
      this.loop();
      //console.log(e);
    });

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
      
      this.raf = requestAnimationFrame( this.loop.bind( this ) );
    }else{
      cancelAnimationFrame( this.raf );
    }
    
    dt = t;
  }

  draw(){
    this.brush.paint()
  }
}


new App();

export { App };
