describe("Directive: Header", function () {
    'use strict';

    var element, scope;

    beforeEach(module('bb-static', 'brewbear'));

    beforeEach(inject(function($rootScope, $compile){
        scope = $rootScope.$new();

        element = '<brew-bear-header></brew-bear-header>';
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('Verifies the directive is instantiated', function(){
        expect(element).toBeDefined();
        expect(element.find('.navbar').length).toEqual(1);
    });
});
