(function () {
  'use strict';

  angular.module('finnplay.common.ui.select', [])

    .directive('fpSelect', function ($parse) {
      return {
        restrict: 'E',
        template: [
          '<label class="fp-select">',
              '<select ng-disabled="disabled === \'true\'" class="fp-select__select  fp-form-input" ng-model="model" ',
                'fp-on-touch=""',
                'ng-options="option.value as option.name | translate group by option.group for option in options"',
                'ng-change="onChange()">',
              '<option value disabled selected>{{::placeholder | translate}}</option>',
            '</select>',
          '</label>'
        ].join(''),
        scope: {
          model: '=ngModel',
          onChange: '&',
          placeholder: '@',
          disabled: '@'
        },
        compile: function (_element, _attrs) {

          if (!_attrs.placeholder) {
            // Remove option used for placeholder
            angular.element(_element.find('select')[0].options[0]).remove();
          }

          // LINK
          return function (scope, element, attrs) {

            element.addClass('fp-select');

            scope.onChange = scope.onChange || angular.noop;

            if (attrs.name) {
              element.addClass('fp-select--' + attrs.name);
            }

            if (attrs.options) {
              scope.$parent.$watchCollection($parse(attrs.options), function (value) {
                scope.options = (value || []).map(function (item) {
                  // Transform options array
                  return angular.isObject(item) ? item : {name: item, value: item};
                });
              });
            }

          };

        }
      };
    });

})();
