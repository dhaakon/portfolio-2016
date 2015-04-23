var Project = require('./project');

var Portfolio = function( data ){
    this.data = data;
    this.htmlElement = document.createElement('div')
    this.init();
};


var proto = Portfolio.prototype = {
    projects : []
};

proto.init = function(){
    this.createProjects();
    console.log(this.projects);
    for( var i; i < this.projects.length; ++i ){
        var _p = this.projects[i];
        _p.intro();
    }
};

proto.createProjects = function(){
    for(work in this.data.work){
        var project = this.data.work[work];
        this.projects.push( new Project(project) );
    }
};

module.exports = Portfolio;
