(function() {
'use strict';

angular.module('finnplay.core.common.logout', [
  'ui.router'
])

.config(function ($stateProvider) {

  $stateProvider.state('logout', {
    parent: '_main',
    url: '/logout',
    onEnter: function ($rootScope, Auth, Notifier) {
      if ($rootScope.isPayAndPlayCountry) Notifier.success('APP.FORM.PNP.PAUSE.HINT');
      Auth.logout();
    }
  });

});
})();
