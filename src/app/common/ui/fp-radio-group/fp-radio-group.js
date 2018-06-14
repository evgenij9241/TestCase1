(function () {
  'use strict';

  angular.module('finnplay.common.ui.radio-group', [])

    .directive('fpRadioGroup', function ($parse) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-radio-group/fp-radio-group.tmpl.html',
        scope: {
          model: '=ngModel',
          name: '@',
          options: '='
        },
        link: function (scope, element, attrs) {
            scope.group = {};

            scope.$watch('model', function () {
              scope.group.model = scope.model;
            });

            scope.$watch('group.model', function () {
              scope.model = scope.group.model;
            });

            element.addClass('fp-radio-group');

            if (attrs.name) {
              element.addClass('fp-radio-group--' + attrs.name);
            }

            if (attrs.options) {
              scope.$parent.$watchCollection($parse(attrs.options), function (value) {
                scope.options = (value || []).map(function (item) {
                  // Transform options array
                  var result = angular.isObject(item) ? item : {name: item, value: item};
                  return result;
                });
              });
            }
        }
      };
    });

})();
