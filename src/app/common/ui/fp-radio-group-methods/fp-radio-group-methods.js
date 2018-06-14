(function () {
  'use strict';

  angular.module('finnplay.common.ui.radio-group-methods', [])

    .directive('fpRadioGroupMethods', function ($parse) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-radio-group-methods/fp-radio-group-methods.tmpl.html',
        scope: {
          model: '=ngModel',
          name: '@',
          options: '='
        },
        link: function (scope, element, attrs) {
          scope.group = {model: scope.model};
          
          scope.$watch('model', function (value) {
            scope.group.model = value;
          });

          scope.$watch('group.model', function () {
            scope.model = scope.group.model;
          });
          
          if (attrs.options) {
            scope.$parent.$watchCollection($parse(attrs.options), function (value) {
              if (value.length % 2 === 0) {
                scope.options = value;
              } else {
                scope.firstMethod = value.shift();
                scope.options = value;
              }
            });
          }
        }
      };
    });

})();
