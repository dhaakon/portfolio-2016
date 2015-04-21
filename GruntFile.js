module.exports = function(grunt){

  var options = {
    watch:{},
    nodemon:{
        src: {
            options: {
                file: '<%= appConfig.app.src %>/<%= appConfig.app.rootPage %>',
                args: ['development'],
                nodeArgs: ['--debug'],
                ignoredFiles: ['*.md', 'node_modules/**'],
                watchedExtensions: ['js', 'jade', 'css', 'scss'],
                watchedFolders: ['<%= appConfig.app.src %>', '<%= appConfig.app.src %>/sass/**','<%= appConfig.app.src %>/routes/**', '<%= appConfig.app.src %>/views/**'],
                delayTime: 1,
                env: {
                    PORT: '<%= appConfig.app.srcPort %>'
                },
                cwd: __dirname
            }
        }
    },
    express:{},
    browserify:{},
    sass:{},
    concurrent:{}
  };

  grunt.initConfig(options);
}
