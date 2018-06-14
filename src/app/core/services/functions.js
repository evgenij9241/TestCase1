(function() {
'use strict';

angular.module('finnplay.core.services.functions', [])

.constant('Fn', {
  scrollTimeout: null,
  autoScroll: function (callback, enable) {
    var self = this;
    if ((document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0)){
      window.scrollBy(0, enable ? -50 : -50000);
      self.scrollTimeout = window.setTimeout(function () {
        self.autoScroll(callback, enable);
      }, 5);
    } else {
      window.clearTimeout(self.scrollTimeout);
      if(callback) { callback(); }
    }
  },

  getDate:      function (date) {
    var dateMask = 'YYYY-MM-DD';
    if (!date) {
      return window.moment(new Date()).format(dateMask);
    }
    return window.moment(date).format(dateMask);
  },
  /**
   * Generates an integer Array containing an arithmetic progression.
   * @param {number} start - the first number
   * @param {number} stop - number after the last number
   * @param {number} step - the distance between adjacent numbers
   * @returns {array}
   * @description:
   * A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted,
   * defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented)
   * by step, exclusive. Note that ranges that stop before they start are considered to be zero-length instead of
   * negative — if you'd like a negative range, use a negative step.
   * Fn.range(10);         => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   * Fn.range(1, 11);      => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   * Fn.range(0, 30, 5);   => [0, 5, 10, 15, 20, 25]
   * Fn.range(0, -10, -1); => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
   * Fn.range(0);          => []
   */
  range: function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = new Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  },

  /**
   * Checks to see if an object is empty (contains no enumerable properties).
   * @param {object} obj - the object that will be checked to see if it's empty
   * @returns {boolean}
   * (jquery source code)
   */
  isEmptyObject: function (obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  },

  /**
  * Check on mobile device.
  * @returns {boolean}
  */
  isMobile: (function () {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(window.navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(window.navigator.userAgent.substr(0,4));
  })(),

  /**
  * Check is small screen lt then 481px.
  * @returns {boolean}
  */
  isSmallScreen: (function () {
        return window.innerWidth <= 740;
      })(),

  /**
   * Removes all own properties from object.
   * @param obj - object to cleaning
   * @returns {object} obj
   */
  cleanObject: function (obj) {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        delete obj[name];
      }
    }
    return obj;
  },

  /**
   * Copies all properties from one object to another. (light version)
   * @param src - object-donor
   * @param dest - object-acceptor (own properties will be removed before copying)
   * @returns {object} dest
   */
  cloneObject: function (src, dest) {
    dest = dest || {};
    if (src !== dest) {
      this.cleanObject(dest);
      for (var name in src) {
        if (src.hasOwnProperty(name)) {
          dest[name] = src[name];
        }
      }
    }
    return dest;
  },

  /**
   * Concatenates an array with another one.
   * @param dest - array-acceptor
   * @param src - array-donor
   * @returns {object} dest
   * @description
   * It is similar to the array's "concat" function, except that it returns original array.
   */
  concatArrays: function (dest, src) {
    dest.push.apply(dest, src);
    return dest;
  },

  /**
   * Converts snake_case to camelCase.
   * Also there is special case for Moz prefix starting with upper case letter.
   * @param {string} name - name to normalize
   * @returns {string} - normalized name
   * (angular source code)
   */
  camelCase: function (name) {
    return name.
      replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(/^moz([A-Z])/, 'Moz$1');
  },

  /**
   * Converts camelCase to snake_case.
   * @param {string} name - name to conversion
   * @param {string} separator - separator used between words (default: "_")
   * @param {boolean} uppercase - convert string to uppercase before returning
   * @returns {string} - converted name
   * (angular source code)
   */
  snakeCase: function (name, separator, uppercase) {
    separator = separator || '_';
    name = name.replace(/[A-Z]/g, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
    return !!uppercase ? name.toUpperCase() : name;
  },

  /**
   * Capitalizes first letter of the string
   * @param {string} string - string for the capitalization
   * @returns {string}
   */
  capitalize: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
    * Converts any string (snake_case, lower case, UPPER CASE) to capitalized each word
    * @param {string} str
    * @returns {string}
  */
  capitalizeAll: function(str) {
    return str
      .toLowerCase()
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
  },

  /**
   * Uncapitalizes first letter of the string
   * @param {string} string - string for the uncapitalization
   * @returns {string}
   */
  uncapitalize: function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  },

  /**
   * Creates a serialized representation of an object, suitable for use in a URL query string or Http request.
   * @param {object} data - an object to serialize
   * @returns {string}
   * @description
   * Simplified version of jQuery.param()
   * https://github.com/jquery/jquery/blob/master/src/serialize.js
   */
  serialize: function (data) {
    if (!angular.isObject(data)) {
      return (!data) ? '' : data.toString();
    }

    var buffer = [];

    var add = function (key, value) {
      // If value is a function, invoke it and return its value
      value = angular.isFunction(value) ? value() : (value === null ? '' : value);
      buffer[buffer.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };

    var build = function (key, value) {
      if (angular.isArray(value)) {
        // Serialize array item.
        angular.forEach(value, function (v, k) {
          if (/\[\]$/.test(key)) {
            // Treat each array item as a scalar.
            add(key, v);
          } else {
            // Item is non-scalar (array or object), encode its numeric index.
            build(key + '[' + (typeof v === 'object' ? k : '') + ']', v);
          }
        });
      }
      else if (angular.isObject(value)) {
        // Serialize object item.
        for (var name in value) {
          build(key + '[' + name + ']', value[name]);
        }
      }
      else {
        // Serialize scalar item.
        add(key, value);
      }
    };

    // Serialize each key in the object.
    for (var name in data) {
      build(name, data[name]);
    }

    // Return the resulting serialization
    return buffer.join('&').replace(/%20/g, '+');
  },

  /**
   * Substitute object keys without order loss
   * @param {object} obj - object, in which substitution will be performed
   * @param {object} aliases - object of keys with their aliases (e.g. {"key1":"alias1", "key2":"alias2", ...})
   * @returns {object} - original object
   */
  substituteKeys: function (obj, aliases) {
    var keysArray = Object.keys(obj);  // To preserve order

    for (var i = 0; i < keysArray.length; i++) {
      var key = keysArray[i],
          value = obj[key];

      delete obj[key];

      if (aliases.hasOwnProperty(key)) {
        obj[aliases[key]] = value;
      }
      else {
        obj[key] = value;
      }
    }

    return obj;
  },

  /**
   * Returns the domain url.
   * @example:
   * "http://example.com/some/page?query=params#hash" -> "http://example.com"
   */
  domainUrl: function () {
    var pathArray = window.location.href.split( '/'),
      protocol = pathArray[0],
      host = pathArray[2],
      url = protocol + '//' + host;
    return url;
  },

  /**
   * Returns the domain name from url.
   * @param {string} url - absolute url
   * @returns {string} - domain name
   * @example:
   * "http://example.com/some/page?query=params#hash" -> "example.com"
   */
  urlDomain: function (url) {
    return (url.match(/^.*\/\/([^/]+)/) || [])[1];
  },

  /**
   * Remove the domain name from url.
   * @param {string} url - absolute url
   * @returns {string} - truncated url
   * @example:
   * "http://example.com/some/page?query=params#hash" -> "/some/page?query=params#hash"
   */
  urlWithoutDomain: function (url) {
    return url.replace(/^.*\/\/[^/]+/, '') || '/';
  },

  /**
   * Remove the query parameters from url.
   * @param {string} url - url
   * @returns {string} - truncated url
   * @example:
   * "http://example.com/some/page?query=params#hash" -> "http://example.com/some/page"
   */
  urlWithoutQueryParams: function (url) {
    return url.split('?')[0];
  },

  /**
   * Get a value of the query parameter.
   * @param {string/null} url - URL to retrieve a value of the parameter (if you does not provide url it will be taken
   * from current location)
   * @param {string} name - name of the parameter
   * @returns {string/null} - value of the parameter
   */
  getUrlParam: function (url, name) {
    url = url || document.URL;
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(url.substring(url.indexOf('?')));
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  /**
   * Is query exist in url search.
   * @param url - url or search
   * @param name - query param name
   * @returns {boolean}
   */
  isQueryInUrl: function (url, name) {
    if(url.indexOf('?' + name) != -1) {
      return true;
    } else if(url.indexOf('&' + name) != -1) {
      return true;
    }
    return false
  },

  /**
   * Get position of the caret for an input element.
   * @param element - input element to get caret
   * @returns {number}
   */
  getCaretPosition: function  (element) {
    var position = element.value.length;
    // IE support
    if (document.selection) {
      element.focus();
      position = document.selection.createRange().moveStart('character', -position).text.length;
    }
    // Other
    else if (element.selectionStart || element.selectionStart === '0') {
      position = element.selectionStart - 1;
    }
    return position;
  },

  /**
   * Set position of the caret for an input element.
   * @param element - input element to set caret
   * @param position - position to set caret
   */
  setCaretPosition: function (element, position) {
    if (element.setSelectionRange) {
      element.focus();
      element.setSelectionRange(position, position);
    }
    else if (element.createTextRange) {
      element.createTextRange().collapse(true).moveEnd('character', position).moveStart('character', position).select();
    }
  },

  /**
   * Quote regular expression characters
   * @param {string} str - input string
   * @param {string} delimiter - If the optional delimiter is specified, it will also be escaped. This is useful for
   * escaping the delimiter that is required by the PCRE functions. The / is the most commonly used delimiter.
   * @returns {string} - quoted (escaped) string
   * @description
   * A JavaScript equivalent of PHP’s preg_quote.
   * Takes "str" and puts a backslash in front of every character that is part of the regular expression syntax.
   * This is useful if you have a run-time string that you need to match in some text and the string may contain special
   * regex characters.
   */
  pregQuote: function (str, delimiter) {
    return String(str).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
  },

  optimizedResize: (function () {
    var callback,
        startCallback,
        running = false;

    // fired on resize event
    function resize() {
      if (!running) {
        running = true;
        if (startCallback) {
          startCallback();
        }
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(runCallback);
        } else {
          window.setTimeout(runCallback, 66);
        }
      }
    }

    function runCallback() {
      callback();
      running = false;
    }

    return {
      init: function (cb, startCb) {
        window.addEventListener('resize', resize);
        callback = cb;
        startCallback = startCb;
      }
    };
  })()

});
})();
