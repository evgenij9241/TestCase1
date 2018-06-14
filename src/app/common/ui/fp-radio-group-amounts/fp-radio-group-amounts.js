(function () {
  'use strict';

  angular.module('finnplay.common.ui.radio-group-amounts', [])

    .directive('fpRadioGroupAmounts', function ($parse) {
      return {
        restrict: 'E',
        templateUrl: '/app/common/ui/fp-radio-group-amounts/fp-radio-group-amounts.tmpl.html',
        scope: {
          model: '=ngModel',
          name: '@',
          options: '=',
          min: '=',
          max: '=',
          currency: '='
        },
        link: function (scope, element, attrs) {

            function setVisibilityForOptions() {
              var visibleLen = 0;
              amounts.map(function(amount) {
                if (amount >= scope.min) { visibleLen += 1; }
              });
              scope.optionsLen = scope.options.length; // number of all options of ammounts
              scope.visibleLen = visibleLen; // number of visible options of ammounts
              scope.lastWide = scope.visibleLen % 2 === 1; // is last amount option 2x wide then others?
            }

            scope.group = {model: scope.model};      

            var amounts = [];

            scope.$watch('model', function (value) {
              value = parseInt(value);
              if (amounts.indexOf(value) >= 0) {
                scope.group.amount = 'no';
                scope.group.model = value;
              } else {
                scope.group.amount = 'yes';
              }
            });

            scope.$watch('group.model', function () {
              scope.model = scope.group.model;
            });

            scope.$watch('min', function () {
              setVisibilityForOptions();
            });

            if (attrs.options) {
              scope.$parent.$watchCollection($parse(attrs.options), function (value) {
                scope.options = value;
                scope.optionsLen = scope.options.length;
                amounts = (value || []).map(function(item){
                  return item.value;
                });

                setVisibilityForOptions();
              });
            }
        }
      };
    });

})();
