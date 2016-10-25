var EventEmitter = require('wolfy87-eventemitter');

import GSAP from 'gsap';

var ScrollMagic = require('scrollmagic');
var IScroll = require('iscroll');
var _ = require('underscore');
var $ = require('jquery');

require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');

let _dur = 400;

class Scroll extends EventEmitter{
  constructor(){
    super();

    this._c = 0;
    this._colors = [ 'rgb(230,210,220)', 'rgb(250,200,160)', 'rgb( 180, 240, 220)','rgb(240,230,200)', 'rgb(230,160,150)', 'rgb( 220, 250, 230)' ];

    //this._colors = ['red', 'green', 'blue'];
    this.setup();
    this.addCustomTweens();
  }

	setup(){
    this.controller = new ScrollMagic.Controller();
  }

  addCustomTweens(){
    var musicTitle = $('#music-title');
    var _timeline = new TimelineMax();
    var _dur = 100;

    let a1 = TweenMax.from( musicTitle[0], _dur, { css:{ opacity:0, y: -20 } });

    let update = ()=>{};

    _timeline.add( [ a1 ] );

		var _scene = new ScrollMagic.Scene({
			triggerElement: musicTitle[0],
			duration: _dur,
			offset: 0
		}).setTween( _timeline )
			.on('update', update)
      .addTo( this.controller );

    var _sketchPad = $('.sketchpad');
    let arrow = $('#splash .arrow');

    let mainEnd = (e)=>{
      if( e.scrollDirection === "FORWARD" && e.state === "AFTER"){
        _sketchPad.css('opacity', 0);
        this.emitEvent('splash_over');
      }else{
        _sketchPad.css('opacity', 1);

        this.emitEvent('splash_start');
      }
    }

    let mainStart = (e)=>{
      $(document.body).css({ 'background': 'white' });
      if( e.scrollDirection === "FORWARD" && e.state === "AFTER"){
         _sketchPad.css('opacity', 0);
        this.emitEvent('splash_over');

        arrow.hide();
      }else if( e.scrollDirection === "REVERSE" && e.state === "DURING"){
        arrow.show();
      }
    }


		var _scene = new ScrollMagic.Scene({
      triggerElement: musicTitle[0],
			duration: _dur,
			offset: 0
		}).on('end', mainEnd)
      .on('start', mainStart)
      .addTo( this.controller );
  }

  addScene( project ){
    var element = project;

    var _timeline = new TimelineMax();

    var role = element.find('.role');
    var description = element.find('.description');
    var client = element.find('.client');
    var poster = element.find('.poster');
    var title = element.find('.title');
    var arrow = element.find('.arrow');
    var roleHeading = role.find('h2');

    let _sway = 80;
    var _altPush = (element.hasClass('alt')) ? -_sway : _sway;

    let a1 = TweenMax.from( description[0], _dur, { css:{ opacity:1, y: 100 } });
    let a2 = TweenMax.from( client[0], _dur, { css:{ opacity:1, y: -50 } });
    let a3 = TweenMax.from( role[0], _dur + 40, { css:{ opacity:1, y: 140 }, delay: 0.3 });
    let a4 = TweenMax.from( roleHeading[0], _dur + 40, { css:{ opacity:1, y: -50 }, delay: 0.3 });
    let a5 = TweenMax.from( poster[0], _dur - 200, { css:{ opacity:0, y: 20, x: _altPush  } });
    let a6 = TweenMax.from( title[0], _dur, { css:{ opacity:1, y: -50 } });
    let a7 = TweenMax.from( arrow[0], _dur, { css:{ opacity:-3, y: 150 } });
    let a8 = TweenMax.from( element[0], _dur, { css:{ color: 'lightGray' } });

    _timeline.add( [ a1, a2, a3, a4, a5, a6, a7, a8 ] );

    let _skills = role.find('ul').children;

    let update = (e)=>{ };
    let start = (e)=>{
      this._c = (this._c < this._colors.length - 1) ? this._c + 1: 0;
      //this._c = (this._c < this._colors.length - 1) ? this._c + 1: 0;

      if( e.scrollDirection === "FORWARD"){
        arrow.show();
        $(document.body).css({ 'background': this._colors[this._c] });
      }
    }
    let end = (e)=>{ 
      this._c = (this._c < this._colors.length - 1) ? this._c + 1: 0;

      if( e.scrollDirection === "FORWARD" && e.state === "AFTER"){
        //$('.sketchpad').css({ 'background': this._colors[this._c] });
        this.emitEvent('bg_change', [this._colors[this._c]] );
        arrow.hide();
      }else if( e.scrollDirection === "REVERSE" && e.state === "DURING"){
        $(document.body).css({ 'background': this._colors[this._c] });
        arrow.show();
      }
    };

		var _scene = new ScrollMagic.Scene({
			triggerElement: element[0],
			duration: _dur,
			offset: -60
		}).setTween( _timeline )
			.on('update', update)
			.on('end', end)
			.on('start', start)
      .addTo( this.controller );

  //_timeline.play();

  //this.controller.addScene( _scene)
  }
}

export { Scroll }
