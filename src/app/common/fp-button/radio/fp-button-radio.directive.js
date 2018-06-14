(function () {
    'use strict';

    //ui-bootstrap radio
    angular.module('finnplay.common.buttons.radio', [])

        .constant('buttonConfig', {
            activeClass: 'active',
            toggleEvent: 'click'
        })

        .controller('ButtonsController', ['buttonConfig', function(buttonConfig) {
            this.activeClass = buttonConfig.activeClass || 'active';
            this.toggleEvent = buttonConfig.toggleEvent || 'click';
        }])

        .directive('fpButtonRadio', function() {
            return {
                require: ['fpButtonRadio', 'ngModel'],
                controller: 'ButtonsController',
                controllerAs: 'buttons',
                link: function(scope, element, attrs, ctrls) {
                    var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                    //model -> UI
                    ngModelCtrl.$render = function() {
                        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.fpButtonRadio)));
                    };

                    //ui->model
                    element.bind(buttonsCtrl.toggleEvent, function() {
                        if (attrs.disabled) {
                            return;
                        }

                        var isActive = element.hasClass(buttonsCtrl.activeClass);

                        if (!isActive || angular.isDefined(attrs.uncheckable)) {
                            scope.$apply(function() {
                                ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.fpButtonRadio));
                                ngModelCtrl.$render();
                            });
                        }
                    });
                }
            };
        });
})();