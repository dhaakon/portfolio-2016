var EventEmitter = require('wolfy87-eventemitter');

import GSAP from 'gsap';

var ScrollMagic = require('scrollmagic');
var IScroll = require('iscroll');
var _ = require('underscore');

require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');

class Scroll extends EventEmitter{
  constructor(){
    super();
  }
}


