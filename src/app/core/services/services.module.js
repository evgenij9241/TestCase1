(function() {
  'use strict';

  angular.module('finnplay.core.services', [
    'finnplay.core.services.ajax',
    'finnplay.core.services.payandplay',
    'finnplay.core.services.error',
    'finnplay.core.services.notifier',
    'finnplay.core.services.functions',
    'finnplay.core.services.http-interceptor'
  ]);
})();
