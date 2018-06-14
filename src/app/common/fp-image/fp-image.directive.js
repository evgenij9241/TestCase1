(function () {
  'use strict';

  angular.module('finnplay.common.game.image', [])
    .directive('fpImage', function () {
      return {
        restrict: 'E',
        templateUrl: '/app/common/fp-image/fp-image.tmpl.html',
        scope: {
          customClass: '@',
          src: '=',
          loaded: '=',
          retina: '@',
          noretina: '@'
        },
        controller: 'FpImageCtrl as vm',
        bindToController: true
      };

    })
    .controller('FpImageCtrl', function ($scope, $element, $attrs, $timeout) {
      var vm = this;
      var imageElement;

      vm.imageLoaded = false;

      activate();

      function activate() {
        initImage();
      }

      function initImage () {
        imageElement = $element[0].querySelector('img');
        if (imageElement) {
          imageElement.addEventListener('error', onError);
          imageElement.addEventListener('load', onSuccess);
        } else {
          $timeout(initImage);
        }
      }

      function onSuccess() {
        vm.loaded = true;
        vm.imageLoaded = true;
      }

      function onError() {
        // $element.find('div')[0].setAttribute('style', 'background-color: white;');
        $timeout(function () {
          vm.loaded = true;
        });
      }

    })
    .directive('fpImageNew', function ($timeout, $rootScope) {
      return {
        restrict: 'E',
        templateUrl: $rootScope.isPayAndPlayCountry ? '/app/common/fp-image/fp-image-pnp.tmpl.html' : '/app/common/fp-image/fp-image-new.tmpl.html',
        scope: {
          loaded: '&',
          error: '&',
          customClass: '@',
          imageSrc: '@',
          retina: '@',
          noretina: '@'
        },
        link: function (scope, element, attrs) {
          var image = null;
          activate();
          function activate() {
            attrs.$observe('imageSrc', function (src) {
              initImage(src);
            });
          }

          function initImage (src) {
            if (!src) return;
            image = element[0].querySelector('img');
            image.setAttribute('ng-src', src);
            image.addEventListener('error', onError);
            image.addEventListener('load', onSuccess);
          }

          function removeLoader () {
            var loader = element[0].querySelector('svg');
            loader.parentNode.removeChild(loader);
            image.style.display = 'block';
          }

          function onSuccess() {
            removeLoader();
            scope.loaded();
          }

          function onError() {
            scope.error();
            scope.loaded();
          }
        }
      };

    })
  ;
})();
