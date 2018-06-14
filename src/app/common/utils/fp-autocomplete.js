(function() {
  'use strict';
  angular
    .module('finnplay.common.utils.autocomplete', [])
    .directive('fpAutocomplete', function () {
      return {
        restrict: 'A',
        scope: {
          fpAutocomplete: '=',
          fpAutocompleteOffTypes: '='
        },
        link: function (scope, element) {
          if ((scope.fpAutocompleteOffTypes || []).indexOf(scope.fpAutocomplete) > -1) {
            element[0].setAttribute('readonly', '');
            element.on('focus', function() {
              element[0].removeAttribute('readonly');
            });
          }
        }
      };
    });
})();
