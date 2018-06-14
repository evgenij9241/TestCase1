(function() {
    'use strict';
    angular
        .module('finnplay.common.utils.focus-if', [])
        .directive('fpFocusIf', function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    bindValue: '=ngModel'
                },
                link: function (scope, element, attrs) {
                    attrs.$observe('fpFocusIf', function () {
                            if (scope.$eval(attrs.fpFocusIf)) {
                                element[0].focus();
                            } else {
                                if (scope.$eval(attrs.fpFocusIfClearModel)) {
                                    $timeout(function () {
                                        scope.bindValue = null;
                                    }, 500);
                                }
                            }
                        }
                    );
                }
            };
        });
})();