module.exports = function(grunt){
  require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

  var sassPaths =  [require('node-bourbon').includePaths].concat( require('node-neat').includePaths );
  var path = require('path');
  var options = {
    app_config: grunt.file.readJSON( path.join( __dirname, '/app/settings/config.json' )),
    nodemon:{
        src: {
            options: {
                file: 'app/index.js',
                ignoredFiles: ['*.md', 'node_modules/**'],
                //watchedExtensions: ['js', 'jade'],
                //watchedFolders: ['<%= app_config.app.src %>/routes/**', '<%= app_config.app.src %>/views/**'],
                delayTime: 1,
                env: {
                    PORT: '<%= app_config.app.srcPort %>'
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
    sass:{
      dist:{
        options:{
          includePaths: sassPaths
        },
        files:{
          'public/css/main.css': [
            'app/sass/main.scss'
          ],
          'public/css/font-awesome.css':[
            'app/sass/font-awesome/font-awesome.scss'
          ]
        },
      },
    },
    // Open a web server with a given URL.

    open: {
        server: {
            path: 'http://localhost:<%= app_config.app.devPort %>'
        }
    },

    server: {
        port: '<%= app_config.app.devPort %>',
        base: './'
    },

    concurrent:{
        dev:{
          tasks: ['nodemon', 'watch'],
          options: {
            logConcurrentOutput: true
          }
        }
    },

    uglify:{
        dist:{
            files:{
                'public/js/main.min.js':['public/js/main.js']
            }
        }
    },

    watch: {
        //every time a file is changed, a task is performed
        //gruntfile: {
            //files: ['<%= jshint.app.src %>', '<%= jshint.gruntfile.src %>'],
            //tasks: ['jshint:gruntfile', 'jshint:app' ]
        //},
        app: {
            files: 'app/js/src/**/*.js',
            tasks: ['browserify:dist', 'uglify:dist'],
            options: {
                livereload: '<%= app_config.app.livereloadPort %>'
            }
        },
        sass: {
            files: 'app/sass/**/*.scss',
            tasks: ['sass:dist'],
            options: {
              spawn: true,
              livereload: '<%= app_config.app.livereloadPort %>'
            }
        },
        //jade: {
            //files: '<%= app_config.app.src %>/**/*.jade',
            //tasks: 'compile:jade',
            //options: {
                //livereload: '<%= app_config.app.livereloadPort %>'
            //}
        //}
    }

  };

  grunt.initConfig(options);

  // Start local server and watch for changes in files.
  grunt.registerTask('src', [
      //'jshint',
      'sass',
      'browserify',
      'nodemon:src'
  ]);


  grunt.registerTask( 'dev', ['sass', 'browserify', 'concurrent:dev'])
  grunt.registerTask('default', ['']);
}
