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

    let a1 = TweenMax.from( musicTitle[0], _dur, { css:{ opacity:0, y: 100 } });

    let update = ()=>{};

    _timeline.add( [ a1 ] );

		var _scene = new ScrollMagic.Scene({
			triggerElement: musicTitle[0],
			duration: _dur,
			offset: 0
		}).setTween( _timeline )
			.on('update', update)
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

    let a1 = TweenMax.from( description[0], _dur, { css:{ opacity:0, y: 100 } });
    let a2 = TweenMax.from( client[0], _dur, { css:{ opacity:0, y: -50 } });
    let a3 = TweenMax.from( role[0], _dur + 40, { css:{ opacity:0, y: 140 }, delay: 0.3 });
    let a4 = TweenMax.from( roleHeading[0], _dur + 40, { css:{ opacity:0, y: -50 }, delay: 0.3 });
    let a5 = TweenMax.from( poster[0], _dur - 200, { css:{ opacity:0, y: 20, x: _altPush  } });
    let a6 = TweenMax.from( title[0], _dur, { css:{ opacity:0, y: -50 } });
    let a7 = TweenMax.from( arrow[0], _dur - 50, { css:{ opacity:-3, y: 150 } });

    _timeline.add( [ a1, a2, a3, a4, a5, a6, a7 ] );

    let _skills = role.find('ul').children;


    let update = (e)=>{ };

		var _scene = new ScrollMagic.Scene({
			triggerElement: element[0],
			duration: _dur,
			offset: 0
		}).setTween( _timeline )
			.on('update', update)
      .addTo( this.controller );

  //_timeline.play();

  //this.controller.addScene( _scene)
  }
}

export { Scroll }
