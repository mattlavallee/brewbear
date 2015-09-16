describe('Controller: Brew Bear Route Controller', function() {
    'use strict';

    var controller;

    beforeEach(module('brewbear'));

    beforeEach(inject(function($controller) {
        controller = $controller('BrewBearRouteController', {});
    }));

    describe('controller initialization - ', function() {
        it('Tests instantiation', function() {
            expect(controller).toBeDefined();
        });
    });
});
