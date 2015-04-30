var Animations = {
    fadeIn : {
        curve: [ 0, 1 ],
        update: function( node, c ){
            node.style.opacity = c;
        }
    },
    fadeOut : {
        curve: [ 1, 0 ],
        update: function( node, c ){
            node.style.opacity = c;
        }
    }
};

module.exports = Animations;
