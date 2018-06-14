(function() {
'use strict';

angular.module('finnplay.core.decorators.state', [])

.config(function ($provide) {

  $provide.decorator('$state', function ($delegate, $rootScope, $timeout, $location, $window, User, Fn, fpModal, Language) {
    var $state = $delegate,
      transitionTo = $delegate.transitionTo,
      locationSearch = {};

    $state._current = {};
    $state._previous = {};

    $state.goBack = function (params, options) {
      params = params || {};
      options = angular.extend({ location: 'replace' }, options || {});

      if (!Fn.isEmptyObject($state._previous)) {
        this.go($state._previous.name, angular.extend($state._previous.params, params), options);
      }
      else {
        this.go('home', params, options);
      }
    };

    $state.goHistoryBack = function () {
      $window.history.back();
    };

    $state.transitionTo = function (to, toParams, options) {
      Fn.autoScroll(function () {
        // If you are redirected to already loaded state, $viewContentAnimationEnded will not be emitted
        if ($state.is(to) && to !== 'games-lobby.games-group') {
         return transitionTo(to, toParams, options);
        }

        if (preserveCurrentState(to, toParams)) {

          return User.isLoggedIn(true).then(function (isLoggedIn) {

            $rootScope.isLoggedIn = isLoggedIn;
            $rootScope.isGamePage = $state._current.name === 'game';

            if (!isLoggedIn && $state._current.config.data.access === 'authorized') {
              return transitionTo('home', {}, { location: 'replace' }, options);
            }
            else if (isLoggedIn && $state._current.config.data.access === 'guest') {
              return transitionTo('start', {}, { location: 'replace' });
            }

            if ($state._current.config.data.modal) {
              var ops = {
                onClose: function () {
                  if ($state._current.config.data.modal) {
                    $state.goBack();
                  }
                }
              };
              $rootScope.$broadcast('$stateChangeStart');
              return fpModal.open(angular.extend(ops, $state._current.config.data.modal));
            }

            return transitionTo(to, toParams, options);
          });
        } else {
          return transitionTo('404', {}, { location: 'replace' });
        }
      }, false);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      if (Fn.isEmptyObject($state._previous) && !isModalState($state._previous)) {
        $state._previous = preserveCurrentState(toState, toParams);
      }
      locationSearch = $location.search();
      Language.syncWithUrl(toParams);
    });

    // $rootScope.$on('$stateChangeSuccess',
    //   function () {
    //     $location.search(locationSearch);
    //   }
    // );

    function isModalState (state) {
      if (Fn.isEmptyObject(state.config)) {
        return false;
      }

      if (!state.config && !state.config.data) {
        return false;
      }

      if (!state.config.data) {
        return false;
      }

      return !!state.config.data.modal;
    }

    function preserveCurrentState(state, params) {
      state = typeof state === 'string' ? state : (state || {}).name;
      params = params || {};
      var config = $state.get(state);

      if (!config) {
        return null;
      }

      if (!isModalState($state._current)) {
        $state._previous = angular.copy($state._current);
      } else {
        $state._previous.modal = true;
      }

      config.data = config.data || {};
      $state._current.name = state;
      $state._current.params = params;
      $state._current.config = config;

      return $state._current;
    }

    return $state;
  });

});
})();
