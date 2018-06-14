'use strict';

describe('HomeCtrl', function(){
  var ctrl, scope;

  beforeEach(module('finnplay.pages.home'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define more than 3 awesome things', inject(function($controller) {
    expect(scope.awesomeThings).toBeUndefined();

    ctrl = $controller('HomeCtrl', {
      $scope: scope
    });

    expect(angular.isArray(ctrl.games)).toBeTruthy();
    expect(ctrl.games.length > 3).toBeTruthy();
  }));
});
