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
        'bower_components/angular-route/angular-route.js',
        'bower_components/lodash/lodash.js',
        'bower_components/d3/d3.js',
        // endbower 
        'bower_components/angular-mocks/angular-mocks.js',
        // start js-templates tags
        'public/javascripts/bear.js',
        'public/javascripts/charts/liquid-fill-gauge.js',
        'public/javascripts/private/account/user-account.directive.js',
        'public/javascripts/private/beer.service.js',
        'public/javascripts/private/beer/beer.controller.js',
        'public/javascripts/private/beer/beer.directive.js',
        'public/javascripts/private/beer/edit-beer.directive.js',
        'public/javascripts/private/common/constants/bar-type.constant.js',
        'public/javascripts/private/common/constants/srm.constant.js',
        'public/javascripts/private/common/constants/unit.constant.js',
        'public/javascripts/private/common/gauge-chart.directive.js',
        'public/javascripts/private/common/srm.service.js',
        'public/javascripts/private/routes/brew-bear-route.controller.js',
        'public/javascripts/private/tap.service.js',
        'public/javascripts/private/tap/edit-tap.directive.js',
        'public/javascripts/private/tap/tap.controller.js',
        'public/javascripts/private/tap/tap.directive.js',
        'public/javascripts/private/taproom.service.js',
        'public/javascripts/private/taproom/edit-taproom.directive.js',
        'public/javascripts/private/taproom/taproom.directive.js',
        'public/javascripts/private/unit-math.service.js',
        'public/javascripts/private/user.service.js',
        'public/javascripts/static/header.directive.js',
        'public/javascripts/templates.js',
        // end js-templates tags
        'tests/**/*.spec.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'public/javascripts/!(charts)/**/*.js': ['coverage']
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
