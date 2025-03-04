// Directives/CheckboxDirective/checkboxDirective.js
(function () {
  "use strict";

  angular
    .module("job_listing")
    .directive("checkboxDirective", checkboxDirective);

  function checkboxDirective() {
    return {
      restrict: "E",
      scope: {
        label: "@",
        model: "=",
      },
      templateUrl: "Directives/CheckboxDirective/checkboxDirective.html",
      link: function (scope, element, attrs) {
        scope.toggleCheck = function () {
          scope.model = !scope.model;
        };
      },
    };
  }
})();
