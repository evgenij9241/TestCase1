(function() {
'use strict';

angular.module('finnplay.core.common').directive('fpAutofocus', function ($timeout) {

  /**
   * The HTML5 autofocus property can be finicky when it comes to dynamically loaded templates and such with AngularJS.
   * Use this simple directive to tame this beast once and for all.
   */

  return {
    restrict: 'A',
    link: function (scope, element) {

      $timeout(function () {
        element[0].focus();
      });

    }
  };

});
})();
