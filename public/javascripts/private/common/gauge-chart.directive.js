(function() {
    'use strict';

    function GaugeChart($timeout) {
        return {
            scope: {
                chartId: '@',
                percentage: '@',
                color: '@'
            },
            restrict: 'E',
            templateUrl:
                '/javascripts/private/common/gauge-chart.template.html',
            link: function(scope) {
                var gaugeConfig = liquidFillGaugeDefaultSettings(); //jshint ignore:line
                gaugeConfig.circleThickness = 0.07;
                gaugeConfig.circleColor = '#96999A';
                gaugeConfig.textColor = scope.color;
                gaugeConfig.waveTextColor = '#E8E8E8';
                gaugeConfig.waveColor = scope.color;
                gaugeConfig.waveHeight = 0.05;
                gaugeConfig.waveAnimate = true;
                gaugeConfig.waveRise = true;
                gaugeConfig.waveHeightScaling = false;
                gaugeConfig.waveOffset = 0.25;
                gaugeConfig.textSize = 0.75;
                gaugeConfig.waveCount = 3;

                //wait for UI to render before eval
                $timeout(function() {
                    var chart = loadLiquidFillGauge(scope.chartId, //jshint ignore:line
                        scope.percentage, gaugeConfig);

                    scope.$watch(function() {
                        return scope.percentage;
                    }, function(newPercentage) {
                        chart.update(newPercentage);
                    });
                }, 0);
            }
        };
    }

    angular.module('brewbear-common')
        .directive('gaugeChart', GaugeChart);
})();
