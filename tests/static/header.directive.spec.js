describe('Directive: Header', function() {
    'use strict';

    var element, scope, location;

    beforeEach(module('bb-static', 'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $location) {
        location = $location;
        scope = $rootScope.$new();

        element = '<brew-bear-header></brew-bear-header>';
        element = $compile(element)(scope);
        scope.$apply();
    }));

    it('Verifies the directive is instantiated', function() {
        expect(element).toBeDefined();
        expect(element.find('.navbar').length).toEqual(1);
    });

    describe('path $watch', function() {
        it('correctly updates the active link to tap', function() {
            location.path('/taproom');
            scope.$apply();

            var newActive = element.find('.active');
            expect(newActive.hasClass('bb-nav-tap')).toEqual(true);
        });

        it('correctly updates the active link to trends', function() {
            location.path('/trends');
            scope.$apply();

            var newActive = element.find('.active');
            expect(newActive.hasClass('bb-nav-trends')).toEqual(true);
        });

        it('correctly updates the active link to profile', function() {
            location.path('/account');
            scope.$apply();

            var newActive = element.find('.active');
            expect(newActive.hasClass('bb-nav-profile')).toEqual(true);
        });

        it('defaults to bar as the active link', function() {
            location.path('/');
            scope.$apply();

            var newActive = element.find('.active');
            expect(newActive.hasClass('bb-nav-bar')).toEqual(true);
        });
    });
});
