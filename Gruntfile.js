module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            libs: {
                src: ['bower_components/jquery/dist/jquery.min.js',
                      'bower_components/angular/angular.min.js',
                      'bower_components/bootstrap/dist/js/bootstrap.min.js'],
                dest: 'public/js/<%= pkg.name %>-libs.js'
            },
            libsCss: {
                src: ['bower_components/bootstrap/dist/css/*.min.css',
                'bower_components/fontawesome/css/font-awesome.min.css'],
                dest: 'public/stylesheets/libs-css.min.css'
            },
            dist: {
                src: ['app.js', 'public/javascripts/*.js', 'routes/**/*.js',
                    'views/**/*.js'],
                dest: 'public/js/<%= pkg.name %>.js'
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
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> ' +
                '<%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js':
                        ['<%= concat.dist.dest %>']
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
                    process: true
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.registerTask('test', ['jshint', 'jscs']);

    grunt.registerTask('default',
        ['jshint', 'jscs', 'less', 'concat', 'uglify', 'bowercopy']);
};
