(function() {
  'use strict';

  angular.module('finnplay.common.ui.input-timeout', [])
    .directive('fpInputTimeout', function($timeout) {
      return {
        restrict: 'A',
        require: 'ngModel',
        priority: 99,
        link: function(scope, elm, attr, ngModelCtrl) {
          if (attr.type === 'radio' || attr.type === 'checkbox') { return; }

          activate();

          function activate() {
            elm.unbind('input');

            var debounce;
            elm.bind('input', function() {
              $timeout.cancel(debounce);
              debounce = $timeout( function() {
                scope.$apply(function() {
                  ngModelCtrl.$setViewValue(elm.val());
                });
              }, attr.fpInputTimeout || 1000);
            });
            elm.bind('blur', function() {
              scope.$apply(function() {
                ngModelCtrl.$setViewValue(elm.val());
              });
            });
          }
        }
      };
    });
})();
