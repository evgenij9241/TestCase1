(function() {
    'use strict';
    angular
        .module('finnplay.common.utils.add-class-if', [])
        .directive('fpAddClassIf', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    attrs.$observe('fpAddClassIf', function (value) {
                            if (value) {
                                element[0].classList.add(attrs.addCustomClass);
                            } else {
                                element[0].classList.remove(attrs.addCustomClass);
                            }
                        }
                    );
                }
            };
        });
})();