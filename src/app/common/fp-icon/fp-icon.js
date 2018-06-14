(function () {
  'use strict';

  angular.module('finnplay.common.icon', [])

    .directive('fpIcon', function ($interpolate) {
      return {
        restrict: 'E',
        compile: function (element, attrs) {
          var template = '<i class="fp-icon fp-icon--{{ name }} {{ class }}"></i>';

          template = angular.element($interpolate(template)({name: attrs.name, class: attrs.className}));
          element.append(template);
        }
      };
    });
}());
