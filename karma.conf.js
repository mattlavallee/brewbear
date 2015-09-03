// Karma configuration
// Generated on Tue Jul 14 2015 22:39:43 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
        // bower:js
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.js',
        // endbower 
        'bower_components/angular-mocks/angular-mocks.js',
        // start js-templates tags
        'public/javascripts/templates.js',
        'public/javascripts/bear.js',
        'public/javascripts/static/header.directive.js',        
        // end js-templates tags
        'tests/**/*.spec.js',
        'public/javascripts/**/*.template.html'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'public/javascripts/**/*.js': ['coverage']
    },
    plugins: ['karma-threshold-reporter', 'karma-coverage', 'karma-jasmine',
        'karma-phantomjs-launcher'],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'threshold'],
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            { type: 'html', subdir: 'report-html' }
        ]
    },
    thresholdReporter: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
    },
    port: 9876,
    colors: true,
    // level of logging
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}
