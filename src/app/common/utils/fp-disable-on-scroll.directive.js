(function() {
 'use strict';

 angular.module('finnplay.common.utils.disable-on-scroll', [])
   .directive('fpDisableOnScroll', function ($timeout) {
     return {
       restrict: 'A',
       link: function (scope, element) {
         var timer = null;
         function toggleDisable () {
           $timeout.cancel(timer);

           if(!element.hasClass('disable-hover')) {
             element.addClass('disable-hover');
           }

           timer = $timeout(function() {
             element.removeClass('disable-hover');
           }, 500);
         }

         element[0].contentWindow.onload = function () {
           var _canvas = element[0].contentWindow.document.getElementsByTagName('canvas');
              _canvas[0].addEventListener('mousewheel', toggleDisable, true);
              _canvas[0].addEventListener('DOMMouseScroll', toggleDisable, true);
         };

         window.addEventListener('DOMMouseScroll', toggleDisable, false);

         scope.$on('$destroy', function () {
           window.removeEventListener('DOMMouseScroll', toggleDisable, false);
         });
       }
     };
   });

})();