(function() {
'use strict';

angular.module('finnplay.core.validators.equal', [])

.directive('isEqual', function () {

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, modelCtrl) {

      if (!modelCtrl) {
        return;
      }

      attrs.$observe('isEqual', function () {
        modelCtrl.$validate();
      });

      modelCtrl.$validators.equality = function (modelValue, viewValue) {
        return (modelCtrl.$isEmpty(modelValue) && modelCtrl.$isEmpty(attrs.isEqual)) || viewValue === attrs.isEqual;
      };

    }
  };

});
})();
