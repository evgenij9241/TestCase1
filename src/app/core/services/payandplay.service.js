(function() {
'use strict';

angular.module('finnplay.core.services.payandplay', [])

  .service('PayAndPlay', function (User) {
    var model = this;
    var PNP_COUNTRIES = ['SWE', 'FIN']

    model.isPayAndPlayCountry = function () {
      return User.getCountry().then(function (result) {
        return PNP_COUNTRIES.indexOf(result) > -1;
      });
    };

  });
})();
