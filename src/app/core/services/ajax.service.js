(function() {
'use strict';

angular.module('finnplay.core.services.ajax', [])

.factory('$ajax', function ($q, $http, CacheFactory, Const, Notifier, Error) {

  // (angular source code)
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }

  // (angular source code)
  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for ( var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }

  // (angular source code)
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).
      replace(/%40/gi, '@').
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
  }

  // (angular source code)
  function buildUrl (url, params) {
    if (!params) {
      return url;
    }
    var parts = [];
    forEachSorted(params, function (value, key) {
      if (value === null || angular.isUndefined(value)) {
        return;
      }
      if (!angular.isArray(value)) {
        value = [value];
      }
      angular.forEach(value, function (v) {
        if (angular.isObject(v)) {
          if (angular.isDate(v)) {
            v = v.toISOString();
          }
          else {
            v = angular.toJson(v);
          }
        }
        parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
      });
    });
    if (parts.length > 0) {
      url += ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
    }

    return url;
  }

  // Contains unfinished http promises
  var pendingRequests = {};

  // Setup http cache
  $http.defaults.cache = CacheFactory.createCache('http', {
    capacity: 100,
    maxAge: 15 * 60000 // Items added to this cache expire after 15 minutes
  });

  var cache = CacheFactory.get('http');


  /**
   * Ajax service, based on Angular $http service.
   * @service
   * @name http
   * @param {object} config - Angular $http service configuration (added a new property "filter")
   * @return {object} - promise ($q)
   * @description
   * Functional:
   *  - merge unfinished promises into the one (uses the configuration of the first request);
   *  - clean cache;
   *  - filter returned data (property "filter" works similar to the property "transformResponse",
   *    except that the input data are already resolved), it is used for manipulation of response data before
   *    deferred object will be resolved;
   */
  return function (config) {
    if (!config) {
      var keys = cache.keys();
      angular.forEach(keys, function (key) {
        cache.remove(key);
      });
      return;
    }

    var url = buildUrl(config.url, angular.extend({}, config.params, config.data)),
        deferred = $q.defer(),
        filter = angular.isFunction(config.filter) ? config.filter : function (data) { return data; };

    //
    // if (config.cache === false) {
    //   cache.remove(url);
    // }

    cache.remove(url);
    config.cache = false; //true;

    if (pendingRequests.hasOwnProperty(url)) {
      return pendingRequests[url];
    }

    pendingRequests[url] = deferred.promise;

    $http(config).then(
      function (response) {
        var data = filter(response.data);

        if (data.hasOwnProperty('error')) {
          var error = Error.extractFrom(data);
          data.message = error.message;
          data.replacements = error.replacements;
        }
        deferred.resolve(data);
        delete pendingRequests[url];
      },
      function (response) {
        if (response.statusText) {
          Notifier.danger(response.statusText);
        }

        // Return an empty object to prevent chain of the notices
        deferred.reject({});
        delete pendingRequests[url];
      }
    );

    return deferred.promise;
  };

});
})();
