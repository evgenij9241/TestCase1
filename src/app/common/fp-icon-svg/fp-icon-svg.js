(function () {
	'use strict';

  angular.module('finnplay.common.icon-svg', [])

		.directive('fpIconSvg', function ($compile) {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					function isEval(attr) {
						if (!attr) {
							return false;
						}
						return attr.indexOf('{{') > -1;
					}
					var sizeClass = attrs.size ? 'fp-icon-svg--' + attrs.size : '',
						name = isEval(attrs.name) ? scope.$eval(attrs.name) : attrs.name,
						className = isEval(attrs.className) ? scope.$eval(attrs.className) : attrs.className || '',
						viewBox = attrs.viewBox ? scope.$eval(attrs.viewBox) : [0, 0, 128, 128];

					var template = '<svg class="fp-icon-svg ' + sizeClass + ' ' + className +
						'" viewBox="' + viewBox.join(' ') + '"><use xlink:href="#icon-' + name + '"></use></svg>';

					element.append($compile(template)(scope));
				}
			};
		});
}());
