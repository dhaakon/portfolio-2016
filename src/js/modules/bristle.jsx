import { rand } from './helpers.jsx';

let round = Math.round;

var raf;

let Mark = {
  circle: function( bristle ){
    let _ctx = bristle.ctx;
    
    let _y = bristle.y;

    let hb = bristle.heartbeat;
    let _curve = Math.cos( ( Math.PI / 180) * (hb * 4 ));
    
    _curve *= (bristle.influence * bristle.dir);


    let _x = (_curve/10) + (bristle.x + (hb/bristle.sway));
    
    let _r = bristle.radius;

    let _s = parseFloat( (hb * 8) / _r, 1 ).toFixed( 1 );

    _ctx.save();
    _ctx.beginPath();
    _ctx.fillStyle = bristle.fill;
    _ctx.arc(  _x, _y - hb, _s, 0, 2 * Math.PI );
    _ctx.fill();
    //_ctx.stroke();
    _ctx.restore();
  }
}

class Bristle{
  constructor( ctx, tracker, options ){
    //this.heartbeat = 0;
    this.tracker = tracker;

    this.dir = [ 1, -1 ][ round( Math.random() * 1 )];

    this.sway = this.dir * rand( 1, 5 );
    this.life = Math.round( rand( 10, 500 ) );
    this.influence = rand( 20, 300 );

    let r = 0;// Math.round( rand( 255 ) );

    this.fill = 'rgba(' + [ r, r, r, Math.min( 0.4, Math.random()) ].join(',') + ')';

    this.radius = rand( 430, 440 );
    this.x = this.tracker.x;
    this.y = this.tracker.y;
    this.alive = true;

    this.ctx = ctx;
  }

  draw(){
    if( this.alive ){
      this.paint();
    }
  }

  paint(){
    if( this.heartbeat++ < this.life ){
      this.drawing = true;

      raf = requestAnimationFrame( this.paint.bind( this ));

      Mark.circle( this );
    }else{
      this.alive = false;
      cancelAnimationFrame( raf );
    }
  }
}

var proto = Bristle.prototype;

proto.life = 60;
proto.radius = 40;
proto.heartbeat = 0;
proto.alive = true;
proto.drawing = false;


export { Bristle }
