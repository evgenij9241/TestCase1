(function() {
  'use strict';

  angular.module('finnplay.core', [
    'finnplay.models.language',
    'finnplay.models.user',
    'finnplay.models.game',


    'finnplay.core.services',
    'finnplay.core.filters',
    'finnplay.core.validators',
    'finnplay.core.common',
    'finnplay.core.decorators.state',
  ]);
})();
