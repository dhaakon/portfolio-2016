var EventEmitter = require('wolfy87-eventemitter');
var template = require('../templates/video_modal.jade');

import GSAP from 'gsap';

var $ = require('jquery');

class VideoModal extends EventEmitter{
  constructor(){
    super();

    this.setup();
    this.onresize();
    this.onscroll();
    $(window).on('resize', this.onresize.bind(this));
    $(window).on('scroll', this.onscroll.bind(this));
  }

  onresize(){
    this.container.css( 'width', window.innerWidth );
    this.container.css( 'height', window.innerHeight );
  }
  onscroll(){
    this.container.css( 'top', $(window).scrollTop() );
  }

  setup(){
    
  }

  close(){
    console.log('closing');
    this.animateOut();
  }

  open( src ){
    console.log('opening ' + src);
    console.log(this.container);
    this.src = src;

    this.animateIn();
  }

  animateIn(){
    this.container.css( 'display', 'block' );
    this.container.css( 'pointerEvents', 'all' );
    TweenMax.to( this.container[0], 0.2, { css: { opacity: 1 } } );

    this.element = $( template( {src: this.src } ) );

    this.container.append( this.element );
    this.closeElement = this.container.find('.close'); 
    this.frame = this.element.find('iframe'); 

    //this.frame.attr('src', this.src );
    console.log(this.closeElement);

    this.closeElement.on('click', this.close.bind(this) );
  }

  closeComplete(){
    console.log('close complete');
    this.container.css( 'pointerEvents', 'none' );
    this.container.empty();
  }

  animateOut(){
    TweenMax.to( this.container[0], 0.2, { css: { opacity: 0 }, onComplete: this.closeComplete.bind(this) } );

  }
}

var proto = VideoModal.prototype;

proto.container = $('.modal-container');
proto.closeElement = null 

export { VideoModal };
