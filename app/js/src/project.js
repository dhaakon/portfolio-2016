var Project = function( data ){
    this.data = data;
    this.init();
}

var proto = Project.prototype = {};

proto.init = function(){
    console.log('Creating new Project - ' + this.data.title);
};

proto.createTitle = function(){};
proto.createDescription = function(){};
proto.intro = function(){};
proto.outro = function(){};

module.exports = Project;
