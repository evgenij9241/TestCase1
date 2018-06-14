(function () {
    'use strict';

    //ui-bootstrap checkbox
    angular.module('finnplay.common.buttons.checkbox', [])

        .constant('buttonConfig', {
            activeClass: 'active',
            toggleEvent: 'click'
        })

        .controller('ButtonsController', ['buttonConfig', function(buttonConfig) {
            this.activeClass = buttonConfig.activeClass || 'active';
            this.toggleEvent = buttonConfig.toggleEvent || 'click';
        }])

        .directive('fpButtonCheckbox', ['$document', function($document) {
            return {
                require: ['fpButtonCheckbox', 'ngModel'],
                controller: 'ButtonsController',
                controllerAs: 'button',
                link: function(scope, element, attrs, ctrls) {
                    var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                    function getTrueValue() {
                        return getCheckboxValue(attrs.fpButtonCheckboxTrue, true);
                    }

                    function getFalseValue() {
                        return getCheckboxValue(attrs.fpButtonCheckboxFalse, false);
                    }

                    function getCheckboxValue(attributeValue, defaultValue) {
                        var val = scope.$eval(attributeValue);
                        return angular.isDefined(val) ? val : defaultValue;
                    }

                    //model -> UI
                    ngModelCtrl.$render = function() {
                        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
                    };

                    //ui->model
                    element.bind(buttonsCtrl.toggleEvent, function() {
                        if (attrs.disabled) {
                            return;
                        }

                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                            ngModelCtrl.$render();
                        });
                    });

                    //accessibility
                    element.on('keypress', function(e) {
                        if (attrs.disabled || e.which !== 32 || $document[0].activeElement !== element[0]) {
                            return;
                        }

                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                            ngModelCtrl.$render();
                        });
                    });
                }
            };
        }]);
})();