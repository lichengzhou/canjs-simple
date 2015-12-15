// Generated on 2014-12-02 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var Mustache = require('mustache');
  var _ = require('underscore');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    version: '1.0',
    target: 'prd'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          // mocha设置的时候裁需要关闭false
          // open: false,

          open: true,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      autogen: {
        files: [{
          dot: true,
          src: [
            'app/app/scripts/api/*',
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: false,
          reporter: 'Spec',
          urls: [
            'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html',
            // 'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test.api.html'
          ]
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    curl: {
      api: {
        'src': 'http://115.28.11.229/info.api?json',
        // 'src': 'http://115.28.145.123/info.api?raw',
        'dest': 'autogen/api/source.xml'
      }
    },

    convert: {
      options: {
        explicitArray: false,
      },
      xml2json: {
        files: [
          {
            expand: true,
            cwd: 'autogen/api/',
            src: ['**/*.xml'],
            dest: 'autogen/api/',
            ext: '.json'
          }
        ]
      }
    },

    jsdox: {
      generate: {
        options: {
          contentsTitle: 'API DOCS'
        },
        src: ['app/scripts/framework/*.js'],
        dest: 'docs'
      }
    },

    requirejs: {
      base: {
        options: {
          // optimize: 'none',
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/sf.web.<%= config.target %>.ver.<%= config.version %>.build.'+Date.now()+'.js',
          mainConfigFile: './<%= config.app %>/scripts/require.config.js',
          paths: {
            'can': '../bower_components/canjs/amd/can',
            'jquery': '../bower_components/jquery/dist/jquery',
            'underscore': '../bower_components/underscore/underscore-min',
            'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
            'md5': '../bower_components/blueimp-md5/js/md5.min',
            'underscore.string': '../bower_components/underscore.string/dist/underscore.string.min',
            'store': '../bower_components/store/store',
            'sf.b2c.mall.business.config': 'scripts/config/sf.b2c.mall.business.<%= config.target %>.config'
          },
          include: [
            'can',
            'jquery',
            'jquery.cookie',
            'underscore',
            'underscore.string',
            'md5',
            'store'
          ]
        }
      }
    }
  });

  grunt.registerTask('autogen', 'auto generate code', function (target) {
    var config = {
      created_path: 'app/scripts/api',
      api_tpl: 'autogen/api/api.mustache',
      api_json: 'autogen/api/source.json',
      filter_group: ['order', 'user', 'logistics', 'product', 'shopcart', 'b2cmall', 'sc', 'supplychain', 'lluser', 'llorder',  'llproduct'],
      security_level: ['UserLogin', 'RegisteredDevice', 'None'],
      security_type: {
        'UserLogin': 'SecurityType.UserLogin',
        'RegisteredDevice': 'SecurityType.RegisteredDevice',
        'None': 'SecurityType.None'
      },
      err_tpl: 'autogen/api/error.mustache',
      prefix: 'sf.b2c.mall.api.',
      err_file_path: 'app/scripts/api/sf.b2c.mall.api.errorCode.js'
    }

    var map = {
      'api': function () {

        grunt.file.mkdir(config.created_path);

        var template = grunt.file.read(config.api_tpl, {encoding: 'utf8'});
        var filterGroup = config.filter_group;
        var securityLevel = config.security_level;
        var securityType = config.security_type;
        var json = grunt.file.readJSON(config.api_json, {encoding: 'utf8'});

        for(var i in json.Document.apiList.api){
          var it = json.Document.apiList.api[i];
          if (it.parameterInfoList && it.parameterInfoList.parameterInfo) {
            var info = it.parameterInfoList.parameterInfo;

            if ( _.isArray(info)){
              for (var i = 0; i < info.length; i++) {
                if (i == info.length-1) {
                  info[i].last = true;
                }

                info[i].isRequired = info[i].isRequired == 'false' ? false:true;

                if (info[i].type.toLowerCase().indexOf('api') > -1) {
                  info[i].type = 'json';
                }
              }
            }else{
              if (info.type.toLowerCase().indexOf('api') > -1) {
                info.type = 'json';
              }
              info.last = true;
            }
          }

          if (it.errorCodeList && it.errorCodeList.errorCode) {
            var error = it.errorCodeList.errorCode;

            if (_.isArray(error)) {
              error[error.length-1].last = true;
            }else{
              error.last = true;
            }
          }

          if (filterGroup.indexOf(it.groupName) > -1 && securityLevel.indexOf(it.securityLevel) > -1) {
            it.securityType = securityType[it.securityLevel];

            var fileContent = Mustache.render(template, it);
            grunt.file.write(config.created_path + '/' + it.groupName + '/' + config.prefix + it.methodName + '.js', fileContent)
          }
        }

        json.Document.codeList.code[json.Document.codeList.code.length - 1].last = true;
        var codeTempalte = grunt.file.read(config.err_tpl, {encoding: 'utf8'});
        var fileContent = Mustache.render(codeTempalte, json.Document.codeList)
        grunt.file.write(config.err_file_path, fileContent)

      }
    };

    var action = map[target];
    if (typeof action === 'function') {
      action.call(this);
    }
  });

  grunt.registerTask('create', '', function (target) {
    grunt.task.run([
      'curl:'+target,
      'convert:',
      'clean:autogen',
      'autogen:'+target
    ])
  });

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    if (target === 'browser') {
      grunt.task.run([
        // 'jshint',
        'connect:test',
        'watch'
      ]);
    }else{
      grunt.task.run([
        'connect:test',
        'mocha'
      ]);
    }
  });

  grunt.registerTask('compile', function (target) {
    config.target = target;

    grunt.task.run([
      'requirejs:base'
    ]);
  })

  grunt.registerTask('build', [
    'clean:dist',
    'compile:dev',
    'compile:test',
    'compile:test2',
    'compile:pre',
    'compile:prd',
    'compile:com'
  ]);

  // grunt.registerTask('build', [
  //   'clean:dist',
  //   'wiredep',
  //   'useminPrepare',
  //   'concurrent:dist',
  //   'autoprefixer',
  //   'concat',
  //   'cssmin',
  //   'uglify',
  //   'copy:dist',
  //   'rev',
  //   'usemin',
  //   'htmlmin'
  // ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
