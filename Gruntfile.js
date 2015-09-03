module.exports = function(grunt) {
    'use strict';
    var jsTagConfig = {
        scriptTemplate: '<script src="{{ path }}"></script>',
        openTag: '<!-- start js-templates tags -->',
        closeTag: '<!-- end js-templates tags -->'
    };
    var cssTagConfig = {
        linkTemplate: '<link href="{{ path }}" />',
        openTag: '<!-- start css-templates tags -->',
        closeTag: '<!-- end css-templates tags -->'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tags: {
            publicJs: {
                options: jsTagConfig,
                src: [ 'public/js/*.js', 'public/js/public/**/*.js' ],
                dest: 'views/index.html'
            },
            publicCss: {
                options: cssTagConfig,
                src: [ 'public/stylesheets/public.style.css' ],
                dest: 'views/index.html'
            },
            privateJs: {
                options: jsTagConfig,
                src: [ 'public/js/*.js', 'public/js/private/**/*.js' ],
                dest: 'views/private/index.html'
            },
            privateCss: {
                options: cssTagConfig,
                src: [ 'public/stylesheets/private.style.css' ],
                dest: 'views/private/index.html'
            }
        },
        wiredep: {
            dev: {
                cwd: '.',
                src: [ 'views/index.html', 'views/private/index.html' ],
                exclude: [ 'bower_components/angular-mocks/' ],
                overrides: {
                    "bootstrap": {
                        "main": [ 
                          'dist/js/bootstrap.min.js',
                          'dist/css/bootstrap.min.css',
                          'dist/css/bootstrap-theme.min.css' 
                        ]
                    }
                }
            }
        },
        bowercopy: {
            options: {
                clean: false,
                report: false
            },
            test: {
                options: {
                    destPrefix: 'public/fonts'
                },
                files: {
                    'glyphicons-halflings-regular.eot':
                        'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
                    'glyphicons-halflings-regular.ttf':
                        'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
                    'glyphicons-halflings-regular.svg':
                        'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
                    'glyphicons-halflings-regular.woff':
                    'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
                    'glyphicons-halflings-regular.woff2':
                    'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
                    'fontawesome-webfont.eot':
                        'fontawesome/fonts/fontawesome-webfont.eot',
                    'fontawesome-webfont.ttf':
                        'fontawesome/fonts/fontawesome-webfont.ttf',
                    'fontawesome-webfont.svg':
                        'fontawesome/fonts/fontawesome-webfont.svg',
                    'fontawesome-webfont.woff':
                        'fontawesome/fonts/fontawesome-webfont.woff',
                    'fontawesome-webfont.woff2':
                        'fontawesome/fonts/fontawesome-webfont.woff2',
                    'fontawesome-webfont.otf':
                        'fontawesome/fonts/FontAwesome.otf'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'public/javascripts/*.js',
                'routes/**/*.js', 'views/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    require: true,
                    __dirname: true,
                    process: true,
                    angular: true
                },
                camelcase: true, //use camelCase,
                eqeqeq: true, //prohibit == and != in favor of !== and ===
                indent: 4, //tab width of 4 spaces
                latedef: true, //prohibit variable use before it's defined
                maxlen: 80, //max line length of 80 charts
                newcap: true, //capitalized names for constructor functions
                quotmark: 'single', //single quote marks for strings
                strict: true, //must use 'use strict' in function scopes
                undef: true, //cannot use undeclared variables
                unused: true //warn when vars are defined but not used
            }
        },
        jscs: {
            files: ['Gruntfile.js', 'app.js', 'public/javascripts/*.js',
                'routes/**/*.js', 'views/**/*.js', 'test/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jscs']
        },
        less: {
            public: {
                files: {
                    'public/stylesheets/public.style.css':
                        ['public/less/shared.less',
                        'public/less/public.less']
                }
            },
            private: {
                files: {
                    'public/stylesheets/private.style.css':
                        ['public/less/shared.less',
                        'public/less/private.less']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-script-link-tags' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-jscs' );
    grunt.loadNpmTasks( 'grunt-bowercopy' );
    grunt.loadNpmTasks( 'grunt-karma' );
    grunt.loadNpmTasks( 'grunt-wiredep' );

    grunt.registerTask('test', ['jshint', 'jscs', 'karma']);

    grunt.registerTask('default',
        [ 'jshint', 'jscs', 'less', 'tags', 'wiredep', 'karma', 'bowercopy']);
};
