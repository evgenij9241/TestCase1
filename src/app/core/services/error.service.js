(function() {
'use strict';

angular.module('finnplay.core.services.error', [])

.service('Error', function (Fn) {
  var model = this;

  model.getMessage = function (errorCode) {
    return 'ERR.CODE.' + errorCode;
  };

  model.extractFrom = function (obj) {
    var error = {
      code: 0,
      message: '',
      replacements: {}
    };

    if (angular.isObject(obj) && obj.hasOwnProperty('error')) {
      var errorCode = parseInt(obj.errorCode, 10) || 0,
          errorParams = angular.isObject(obj.params) ? obj.params : {},
          validationParams = angular.isArray(obj.errors) ? obj.errors : [],
          fields, key, hackLimit, hackCount;

      error.code = errorCode;
      error.message = model.getMessage(errorCode);

      switch (errorCode) {

        case 104:
          fields = [];
          for (var i = 0; i < validationParams.length; i++) {
            var name = Fn.snakeCase(validationParams[i].path, ' ');
            if (fields.indexOf(name) === -1) {
              fields.push(name);
            }
          }
          error.replacements.fields = fields.join(', ');
          break;

        case 105:
          error.replacements.email = errorParams.email || '';
          break;

        case 107:
          hackLimit = parseInt(errorParams.hackLimit, 10) || 0;
          hackCount = parseInt(errorParams.hackCount, 10) || 0;
          error.replacements.number = hackLimit - hackCount;
          break;

        case 109:
          hackLimit = parseInt(errorParams.hackLimit, 10) || 0;
          hackCount = parseInt(errorParams.hackCount, 10) || 0;
          error.replacements.number = hackLimit - hackCount;
          error.replacements.field = Fn.snakeCase(errorParams.field, ' ');
          break;

        case 126:
          error.replacements.start = errorParams.changeTime;
          error.replacements.end = errorParams.blockEndsTime;
          break;

        case 127:
          error.replacements.amount = errorParams.currentTurnover;
          error.replacements.currency = errorParams.currency;
          break;

        case 180:
          fields = [];
          for (key in errorParams) {
            fields.push('**' + key + '** (' + errorParams[key] + ')');
          }
          error.replacements.fields = fields.join(', ');
          break;
      }
    }

    return error;
  };


});
})();