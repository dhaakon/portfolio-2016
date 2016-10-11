import { Bristle } from './bristle.jsx';
import { rand } from './helpers.jsx';


var Shape = {
  mark : function( brush ){
    //brush.ctx.fillRect( rand( 100, 200 ), rand( window.innerHeight ), 4, 4 );

  }
}

let clear = function( ctx ){
  var _w = ctx.canvas.width;
  var _h = ctx.canvas.height;

  ctx.fillStyle = 'rgba( 255,255,255, 0.8)';
  ctx.fillRect( 0, 0, _w, _h );
}

let c = 0;

class Brush{
  constructor( ctx ){
    this.ctx = ctx;
    this.mode = 'BURST'

    let _R = 300;
    let _RX = this.ctx.canvas.width/2;
    let _RY = this.ctx.canvas.height/2;

    //this.tracker.x = (Math.cos( (Math.PI / 180) * 0 ) * _R) + _RX;
    //this.tracker.y = (Math.sin( (Math.PI / 180) * 0 ) * _R) + _RY;

    this.tracker.x = this.ctx.canvas.width/2;
    this.tracker.y = this.ctx.canvas.height/2;

    this.bristles = this.createBristles();

  }

  paint(){
    if ( c < 360 ) c++;
    else c = 0

    //let _R = 300;
    //let _RX = this.ctx.canvas.width/2;
    //let _RY = this.ctx.canvas.height/2;

    //this.tracker.x = (Math.cos( (Math.PI / 180) * c ) * _R) + _RX;
    //this.tracker.y = (Math.sin( (Math.PI / 180) * c ) * _R) + _RY;
    

    for( let bristle in this.bristles ){
      let _b = this.bristles[ bristle ];

      if( _b.alive ){
        _b.draw();
        
      }else{
        var idx = this.bristles.indexOf( _b );
        this.bristles.splice( idx, 1);

        
        //this.bristles.push( new Bristle( this.ctx, this.tracker ) );
      }

    }

    
    if( this.bristles.length === 0 ) this.bristles = this.createBristles();
  }

  createBristles(){
    var arr = [];
    let bCount = 0;

    //this.numBristles += 1;

    while (bCount++ < this.numBristles){
      let _bristle = new Bristle( this.ctx, this.tracker );
      arr.push( _bristle );
    }

    //this.ctx.canvas.width = this.ctx.canvas.width;

    clear( this.ctx );

    return arr
  }
}

var proto = Brush.prototype;

proto.numBristles = 15;

proto.tracker = {
  x : 100,
  y : 100
}

proto.radius = 5;

export { Brush }
