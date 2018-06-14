(function() {
  'use strict';

  angular.module('finnplay.common.ui.input-phone', [])
  .directive('fpInputPhone', function () {
    return {
      restrict: 'E',
      templateUrl: '/app/common/ui/fp-input-phone/fp-input-phone.tmpl.html',
      controller: 'FpInputPhoneCtrl',
      controllerAs: 'vm',
      scope: true,
      bindToController: {
        model: '=ngModel',
        onChange: '&',
        minlength: '=',
        placeholder: '@',
        options: '='
      }
    };
  })
  .controller('FpInputPhoneCtrl', function ($scope, Const) {
    var vm = this;

    activate();

    function activate() {
      var element = angular.element(document.getElementById('fp_input_phone'));
      var onTouch = function () {
        element.off('focus', onTouch);
        vm.options.formControl.$touched = true;
      };
      element.on('focus', onTouch);

      initInputPhone();
    }

    function getPhoneCodes() {
      var phoneCodes = [];
      angular.forEach(Const.phoneCodes, function(value, key) {
        this.push({name: key + ' (' + value + ')', value: value});
      }, phoneCodes);
      return phoneCodes;
    }

    function getModelParams(model) {
      angular.forEach(Const.phoneCodes, function (value) {
        var code = value.replace(/\s+/g, '');
        if (model.indexOf(code) > -1 && value) {
          vm.code = value;
          vm.phone = parseInt(model.replace(vm.code, ''));
          if (!vm.code || !vm.phone) {
            vm.model = null;
          }
        }
      });
    }

    function initInputPhone() {
      vm.phoneCodes = getPhoneCodes();
      if (vm.model) {
        getModelParams(vm.model);
      }

      vm.watchCountry = null;

      if (typeof vm.options.templateOptions.countryField === 'function') {
        vm.watchCountry = vm.options.templateOptions.countryField;
      }

      $scope.$watchCollection(function () {
        return {
          country: vm.watchCountry ? vm.watchCountry() : null,
          code: vm.code,
          phone: vm.phone
        };
      }, function (newVals, oldVals) {
        vm.options.phone = vm.phone;

        if (newVals.country !== oldVals.country && newVals.country) {
          vm.code = Const.phoneCodes[newVals.country];
        }
        if (vm.code && vm.phone) {
          vm.model = vm.code + vm.phone;
        } else {
          vm.model = null;
        }
      });
    }
  });
})();
