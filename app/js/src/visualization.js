var THREE = require('three');
THREE.ColladaLoader = require('./three/ColladaLoader')

var Visualization = function(){
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.animationFrame = null;
    this.kfAnimations = [];
    this.progress = 0;
    this.lastTimestamp = 0;

    this.domElement = document.getElementById('sketch');
    this.dae = null;

};

var proto = Visualization.prototype = {};

proto.init = function(){
    //this.setupScene();
    //this.animate();
};

proto.start = function(){
    this.domElement.style.opacity = 1;

    this.loadCollada();
}

proto.loadCollada = function(){
    var loader = new THREE.ColladaLoader();
    loader.load( 'obj/pyramid.dae', function ( collada ) {
        console.log('collada loaded');

        this.dae = collada.scene;
        this.animations = collada.animations;
        this.kfAnimationsLength = this.animations.length;

        this.setupScene();
        this.animate(this.lastTimestamp);
    }.bind(this) );
};

proto.setupAnimations = function(){
    for ( var i = 0; i < this.kfAnimationsLength; ++i ) {

            var animation = this.animations[ i ];

            var kfAnimation = new THREE.KeyFrameAnimation( animation );
            kfAnimation.timeScale = 1;
            this.kfAnimations.push( kfAnimation );

        }
}

proto.startAnimations = function(){
    for ( var i = 0; i < this.kfAnimationsLength; ++i ) {
        var animation = this.kfAnimations[i];

        for ( var h = 0, hl = animation.hierarchy.length; h < hl; h++ ) {

            var keys = animation.data.hierarchy[ h ].keys;
            var sids = animation.data.hierarchy[ h ].sids;
            var obj = animation.hierarchy[ h ];

            if ( keys.length && sids ) {

                for ( var s = 0; s < sids.length; s++ ) {

                    var sid = sids[ s ];
                    var next = animation.getNextKeyWith( sid, h, 0 );

                    if ( next ) next.apply( sid );

                }

                obj.matrixAutoUpdate = false;
                animation.data.hierarchy[ h ].node.updateMatrix();
                obj.matrixWorldNeedsUpdate = true;

            }

        }
        animation.loop = false;
        animation.play();
    }
}

proto.setupScene = function(){
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    //this.camera.position.z = -1000;
    this.camera.position.set( 2, 2, 3 );
    this.scene = new THREE.Scene();

    //this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
    //this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    //this.mesh = new THREE.Mesh( this.geometry, this.material );

    //this.mesh.position.y = -50;
    //this.mesh.position.z = -200;

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    //particleLight = new THREE.Mesh( new THREE.SphereGeometry( 1, 3, 3 ), new THREE.MeshBasicMaterial( { color: 0xeeffff } ) );
    //this.scene.add( particleLight );

    // Lights

    //this.scene.add( new THREE.AmbientLight( 0xcccccc ) );

    //var directionalLight = new THREE.DirectionalLight([>Math.random() * 0xffffff<]0xeeeeee );
    //directionalLight.position.x = Math.random() - 0.25;
    //directionalLight.position.y = Math.random() - 0.15;
    //directionalLight.position.z = Math.random() - 0.15;
    //directionalLight.position.normalize();
    //this.scene.add( directionalLight );

    var pointLight = new THREE.PointLight( 0xff0000, 0.7 );
    this.scene.add( pointLight );

    //this.controls = new THREE.FirstPersonControls( this.camera );

    //this.controls.movementSpeed = 500;
    //this.controls.lookSpeed = 0.1

    this.scene.add(this.dae);
    this.domElement.appendChild( this.renderer.domElement );
    this.dae.position.z = 0;
    this.dae.position.x = 1;
    this.setupAnimations();
    this.startAnimations();

    //this.camera.lookAt(this.dae);

};
max=270;

proto.animate = function(timestamp){
    var frameTime = ( timestamp - this.lastTimestamp ) * 0.0001;
    if ( this.progress >= 0 && this.progress < max ) {

        for ( var i = 0; i < this.kfAnimationsLength; ++i ) {

            this.kfAnimations[ i ].update( frameTime );

        }

    } else if ( this.progress >= max ) {

        for ( var i = 0; i < this.kfAnimationsLength; ++i ) {

            this.kfAnimations[ i ].stop();

        }

        this.progress = 0;
        this.startAnimations();

    }
    this.progress += 1;
    this.lastTimestamp = timestamp;
    this.dae.rotation.y += 0.01;

    //this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.02;

    //this.dae.position.z -= 10;
    //console.clear();
    //console.log(this.dae.position.z);

    this.renderer.render( this.scene, this.camera );
    this.animationFrame = requestAnimationFrame( this.animate.bind(this) );
}


module.exports = Visualization;
