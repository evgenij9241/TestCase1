(function() {
  'use strict';

  Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  angular.module('finnplay.common.utils', [
    'finnplay.common.utils.show-if-login',
    'finnplay.common.utils.hide-if-login',
    'finnplay.common.utils.autocomplete',
    'finnplay.common.utils.fpNumericOnly',
    'finnplay.common.utils.on-touch',
    'finnplay.common.utils.bindHtml',
    'finnplay.common.utils.position',
    'finnplay.common.utils.disable-on-scroll',
    'finnplay.common.utils.focus-if',
    'finnplay.common.utils.class',
    'finnplay.common.utils.ngRetina',
    'finnplay.common.utils.resize-on-load'
  ]);
})();
