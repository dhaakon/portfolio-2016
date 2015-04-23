var THREE = require('three');

var Visualization = function(){
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.domElement = document.getElementById('sketch');

    this.init();
};

var proto = Visualization.prototype = {};

proto.init = function(){
    this.setupScene();
    this.animate();
};

proto.setupScene = function(){
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.domElement.appendChild( this.renderer.domElement );
};

proto.animate = function(){
    requestAnimationFrame( this.animate.bind(this) );

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render( this.scene, this.camera );
}


module.exports = Visualization;
