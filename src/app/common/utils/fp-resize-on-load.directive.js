(function() {
  'use strict';

  angular.module('finnplay.common.utils.resize-on-load', [])
    .directive('fpResizeOnLoad', function (Fn) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var size = scope.$eval(attrs.fpResizeOnLoad),
              iFrameElement = element[0].getElementsByTagName('iframe')[0];
          iFrameElement.setAttribute('style', 'position: absolute; overflow: hidden; left: 0px;');
          function resize () {
            var width = element[0].clientWidth,
            height = width * size.width / size.height;
            element[0].setAttribute('style', 'width: 100%; height: ' + height + 'px;');
          }

          setTimeout(resize, 2000);

          Fn.optimizedResize.init(function () {
            resize();
          });
        }
      };
    });

})();