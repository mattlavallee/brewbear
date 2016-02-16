describe('Directive: gaugeChart', function() {
    'use strict';

    var mockScope, element, compile, timeout, windowVar, mockChart;
    beforeEach(module('brewbear-common', 'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $timeout, $window) {
        mockScope = $rootScope.$new();
        compile = $compile;
        timeout = $timeout;
        windowVar = $window;

        mockChart = {
            update: function() {}
        };

        spyOn(windowVar, 'liquidFillGaugeDefaultSettings').and.returnValue({});
        spyOn(windowVar, 'loadLiquidFillGauge').and.returnValue(mockChart);
        spyOn(mockChart, 'update');
    }));

    function initDirective() {
        mockScope.percentage = 80;
        var html = '<gauge-chart chart-id="whale" color="#f0f0f0" ' +
            'percentage="{{ percentage }}"></gauge-chart>';
        element = compile(html)(mockScope);
        mockScope.$apply();
    }

    it('initializes the directive properly', function() {
        initDirective();
        expect(element.find('svg').length).toEqual(1);

        expect(windowVar.liquidFillGaugeDefaultSettings.calls.count())
            .toEqual(1);
        expect(windowVar.loadLiquidFillGauge.calls.count()).toEqual(0);
        expect(mockChart.update.calls.count()).toEqual(0);
    });

    it('creates the chart object at the end of the $digest', function() {
        initDirective();
        timeout.flush();

        expect(windowVar.loadLiquidFillGauge.calls.count()).toEqual(1);
    });

    it('updates the chart when the percentage changes', function() {
        initDirective();
        timeout.flush();

        //this is the initial run through the watch
        expect(mockChart.update.calls.count()).toEqual(1);

        mockScope.percentage = 50;
        mockScope.$apply();
        expect(mockChart.update.calls.count()).toEqual(2);
    });
});
