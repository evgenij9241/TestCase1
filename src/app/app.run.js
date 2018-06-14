(function() {
  'use strict';

  var INTERVAL_TO_SYNC_USER = 5000; // 5 seconds for interval on checking user balance from back
  var MAX_LOADING_TIME = 5000; // 5 seconds - maximum time to show loading screen

  if (window.parent) {
    window.parent.postMessage({ action: 'eventFrameUrlChanged', url: document.URL }, "*")
  }

  angular
    .module('finnplay')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $cookies, $rootScope, $interval, $timeout, PayAndPlay) {

    PayAndPlay.isPayAndPlayCountry().then(function (result) {


      $rootScope.dark = false;
      $rootScope.isLoggedIn = false;
      $rootScope.isPayAndPlayCountry = result;


    });


    $rootScope.$on('loading:finish', function(){
      document.documentElement.classList.remove('loading');
    });

    $timeout(function(){
      document.documentElement.classList.remove('loading');
    }, MAX_LOADING_TIME);
  }

})();
