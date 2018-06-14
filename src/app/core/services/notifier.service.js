(function() {
  'use strict';

  angular.module('finnplay.core.services.notifier', [
  ])

  .service('Notifier', function(toastr, $translate){
    var obj = this;

    function show(toastrMethod, untranslatedMessage, replacements, isPersistent){
      $translate(untranslatedMessage, replacements).
        then(function (message) {
          if (message) message = message.replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
          var options = {
            allowHtml: true
          };

          if (isPersistent) {
            options.timeOut = 0;
          }

          return toastr[toastrMethod](message, options);
        });
    }

    obj.clear = function() {
      toastr.clear();
    };

    obj.danger = function(untranslatedMessage, replacements, isPersistent){
      show('error', untranslatedMessage, replacements, isPersistent);
    };

    obj.success = function(untranslatedMessage, replacements, isPersistent){
      show('success', untranslatedMessage, replacements, isPersistent);
    };

    obj.info = function(untranslatedMessage, replacements, isPersistent){
      show('info', untranslatedMessage, replacements, isPersistent);
    };

    obj.warning = function(untranslatedMessage, replacements, isPersistent){
      show('warning', untranslatedMessage, replacements, isPersistent);
    };

    obj.showError = function(response){
      if (!response) {
        return false;
      }

      if (response.hasOwnProperty('error')) {
        obj.danger(response.message, response.replacements);
        return true;
      } else {
        return false;
      }
    };

  });
})();
