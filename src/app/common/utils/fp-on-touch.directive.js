(function () {
    'use strict';

    angular
        .module('finnplay.common.utils.on-touch', [])
        .directive('fpOnTouch', function ($timeout, $rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    if ($rootScope.isMobile) {
                        element.bind('touchstart', function(e) {
                            e.stopImmediatePropagation();
                            $timeout(function () {
                                element[0].focus();

                            });
                        });
                    }
                }
            };
        });
})();