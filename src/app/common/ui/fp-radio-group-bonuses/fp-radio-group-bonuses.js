(function () {
  'use strict';

  angular.module('finnplay.common.ui.radio-group-bonuses', [])

    .directive('fpRadioGroupBonuses', function ($parse, $window, $timeout) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-radio-group-bonuses/fp-radio-group-bonuses.tmpl.html',
        scope: {
          model: '=ngModel',
          name: '@',
          options: '=',
          promo: '@'
        },
        link: function (scope, element, attrs) {
          scope.group = {model: scope.model, promo: ''};
          
          scope.$watch('model', function (value) {
            scope.group.model = value;
          });

          scope.$watch('group.model', function (value) {
            if (value === 'NO-BONUS' || typeof(value) === 'number') {
              scope.showpromo = false;
            }
            scope.model = scope.group.model;
          });

          if (scope.promo) {
            scope.$watch('group.promo', function () {
              if (scope.group.promo && scope.group.promo !== '') {
                scope.model = scope.group.promo;
              } else if (typeof(scope.model) !== 'number') {
                scope.model = 'NO';
              }
            });
          }

          scope.showpromo = false;
          scope.togglePromo = togglePromo;
          scope.focusInput = focusInput;

          if (attrs.options) {
            scope.$parent.$watchCollection($parse(attrs.options), function (value) {
              scope.options = value;
            });
          }

          function togglePromo() {
            scope.showpromo = !scope.showpromo;
            if (!scope.showpromo) {
              scope.model = 'NO-BONUS';
              scope.group.model = 'NO-BONUS';
            } else {
              scope.model = scope.group.promo;
              scope.group.model = scope.group.promo;
              $timeout(function() {
                var input = $window.document.getElementById('input-promo-code');
                if (input) {
                  input.focus();
                }
              });
            }
          }

          function focusInput() {
            scope.group.model = scope.group.promo;
            scope.model = scope.group.promo;
          }
        }
      };
    });

})();
