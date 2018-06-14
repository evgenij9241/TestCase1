(function() {
'use strict';

angular.module('finnplay.core.filters').filter('highlight', function () {

  /**
   * Wraps a fragment of the text.
   * @param text {string} - haystack to search through
   * @param search {string} - needle to search for
   * @param [caseSensitive] {boolean} - optional boolean to use case-sensitive searching
   */

  return function (text, search, caseSensitive) {
    if (text && (search || angular.isNumber(search))) {
      text = text.toString();
      search = search.toString();

      if (caseSensitive) {
        return text.split(search).join('<span class="highlight">' + search + '</span>');
      } else {
        return text.replace(new RegExp(search, 'gi'), '<span class="highlight">$&</span>');
      }
    }
    else {
      return text;
    }
  };

});
})();
