(function() {
  'use strict';

  angular.module('finnplay.models.language', []).service('Language',
    function($q, $ajax, $stateParams, $translate, CacheFactory){
    var model = this;

      model.syncWithUrl = function () {
        return new Promise(function (resolve) {
          return resolve('en')
        })
      }
  });

})();
