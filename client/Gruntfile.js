module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dev: {
        files: [
          { expand: true, cwd: 'src/font/', src: ['**'], dest: 'dev-build/font/', flatten: true },
          { expand: true, cwd: 'src/', src: ['*'], dest: 'dev-build/', flatten: true, filter: 'isFile' }
        ]
      },
      deploy: {
        files: [
          { expand: true, cwd: 'src/font/', src: ['**'], dest: 'deploy/font/', flatten: true },
          { expand: true, cwd: 'src/', src: ['*'], dest: 'deploy/', flatten: true, filter: 'isFile' }
        ]
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
        name: 'init',
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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', function() {
    grunt.log.write('Building to dev-build and starts listening for changes...');
    grunt.task.run(['copy:dev', 'uglify:dev', 'requirejs:dev', 'less:dev', 'htmlmin:dev', 'watch']);
  });

  grunt.registerTask('deploy', function() {
    grunt.log.write('Building to deploy directory...');
    grunt.task.run(['copy:deploy', 'uglify:deploy', 'requirejs:deploy', 'less:deploy', 'htmlmin:deploy']);
  });

  grunt.registerTask('default', 'Message', function() {
    grunt.log.write('Run "grunt dev" to start working on this project.\nRun "grunt deploy" to build to deploy directory.');
  });

};
