(function() {
'use strict';

angular.module('finnplay.core.filters').filter('keys', function () {

  return function (obj) {
    return angular.isObject(obj) ? Object.keys(obj) : [];
  };

});
})();
