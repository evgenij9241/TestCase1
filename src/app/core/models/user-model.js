(function() {
  'use strict';

  angular.module('finnplay.models.user', []).service('User', function(){
    var model = this;

    model.getCountry = function () {
      return new Promise(function (resolve) {
        return resolve('MTL') //'SWE' - is Pay And Play county, 'GBR' - dark theme, 'MLT' - main design
      })
    };

    model.isLoggedIn = function (update) {
      return new Promise(function (resolve) {
        return resolve(false)
      })
    };

  });

})();
