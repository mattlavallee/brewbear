describe('Directive: Edit Tap Directive', function() {
    'use strict';

    var mockScope, element, compile, httpBackend;
    beforeEach(module('brewbear-component', 'brewbear-services',
        'brewbear-templates'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
        mockScope = $rootScope.$new();
        httpBackend = $httpBackend;
        compile = $compile;
    }));

    function initDirective() {
        var html = '<edit-tap id="-1" class="edit-tap"></edit-tap>';
        element = compile(html)(mockScope);
        mockScope.$apply();
    }

    describe('directive initialization - ', function() {
        it('verifies the directive was instantiated', function() {
            initDirective();

            expect(element).toBeDefined();
            expect(element.hasClass('edit-tap')).toEqual(true);
        });

        it('updates when the id changes', function() {
            initDirective();
            var ctrl = element.controller('editTap');
            spyOn(ctrl, 'resetActiveTapModel');
            spyOn(ctrl, 'updateTapModel');

            ctrl.id = 0;
            mockScope.$apply();

            expect(ctrl.resetActiveTapModel.calls.count()).toEqual(1);
            expect(ctrl.updateTapModel.calls.count()).toEqual(0);

            ctrl.id = 22;
            mockScope.$apply();

            expect(ctrl.resetActiveTapModel.calls.count()).toEqual(2);
            expect(ctrl.updateTapModel.calls.count()).toEqual(1);
        });
    });
});
