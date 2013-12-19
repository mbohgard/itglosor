module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    devserver: {
      server: {},
      options: {
        'port' : 8080,
        'base' : 'dev-build/',
        'cache' : 'no-cache',
        'async' : false
      }
    },

    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          'dev-build/js/lib/modernizr.js': ['src/js/lib/modernizr.js']
        }
      },
      deploy: {
        files: {
          'deploy/js/lib/modernizr.js': ['src/js/lib/modernizr.js']
        }
      }
    },

    requirejs: {
      options: {
        baseUrl: 'src/js',
        paths: {
          requireLib: 'lib/require'
        },
        name: 'main',
        include: 'requireLib'
      },
      dev: {
        options: {
          out: 'dev-build/js/scripts.js',
          optimize: 'none'
        }
      },
      deploy: {
        options: {
          out: 'deploy/js/scripts.js',
          optimize: "uglify",
          preserveLicenseComments: false
        }
      }
    },

    less: {
      dev: {
        files: {
          "dev-build/css/main.css": "src/less/main.less"
        }
      },
      deploy: {
        options: {
          cleancss: true
        },
        files: {
          "deploy/css/main.css": "src/less/main.less"
        }
      }
    },

    htmlmin: {
      dev: {
        files: {
          'dev-build/index.html': 'src/index.html'
        }
      },
      deploy: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'deploy/index.html': 'src/index.html'
        }
      }
    },

    watch: {
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['requirejs:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'src/less/**/*.less',
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      html: {
        files: 'src/**/*.html',
        tasks: ['htmlmin:dev'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', function() {
    grunt.log.write('Building to dev-build and starts listening for changes...');
    grunt.task.run(['uglify:dev', 'requirejs:dev', 'less:dev', 'htmlmin:dev', 'devserver', 'watch']);
  });

  grunt.registerTask('deploy', function() {
    grunt.log.write('Building to deploy directory...');
    grunt.task.run(['uglify:deploy', 'requirejs:deploy', 'less:deploy', 'htmlmin:deploy']);
  });

  grunt.registerTask('default', 'Message', function() {
    grunt.log.write('Run "grunt dev" to start working on this project.\nRun "grunt deploy" to build to deploy directory.');
  });

};