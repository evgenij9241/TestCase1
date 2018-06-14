(function () {
  'use strict';

  angular.module('finnplay.common.element', [])
    .directive('fpElement', function () {
      return {
        restrict: 'E',
        templateUrl: '/app/common/fp-element/fp-element.tmpl.html',
        controller: 'FpElementCtrl',
        controllerAs: 'vm',
        replace: true,
        scope: {},
        bindToController: {
          icon: '@',
          text: '@',
        }
      };
    })
    .controller('FpElementCtrl', function () {});
}());
