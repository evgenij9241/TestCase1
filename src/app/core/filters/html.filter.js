(function() {
'use strict';

angular.module('finnplay.core.filters').filter('html', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
});
})();
