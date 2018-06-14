(function() {
    'use strict';
    angular
        .module('finnplay.common.utils.class', [])
        .directive('fpClass', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    function getTargetElement() {
                        if (attrs.fpClassTarget) {
                            var elem = element[0].querySelector('.' + attrs.fpClassTarget);
                            if (elem) {
                                return elem;
                            } else {
                                console.warn('fpClass can\'t find target with class "' + attrs.fpClassTarget + '"');
                                return element[0].children[0];
                            }
                        } else {
                            return element[0].children[0];
                        }
                    }

                    window.HTMLElement.prototype.setClassObject = function (classObj) {
                        var self = this;
                        angular.forEach(classObj, function (value, className) {
                            if (value) {
                                self.classList.add(className);
                            } else {
                                self.classList.remove(className);
                            }
                        });
                    };

                    var elem = getTargetElement();

                    attrs.$observe('fpClass', function () {
                            var classObj = scope.$eval(attrs.fpClass);
                            elem.setClassObject(classObj);
                        }
                    );
                }
            };
        });
})();
