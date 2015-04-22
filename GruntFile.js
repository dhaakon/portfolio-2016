module.exports = function(grunt){
  require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);
  
  var options = {
    app_config: grunt.file.readJSON('./app/settings/config.json'),
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
    browserify:{
      dist:{
        files:{
          'public/js/main.js':'app/js/src/main.js'
        }
      }
    },
    sass:{},
    concurrent:{}
  };

  grunt.initConfig(options);
}
