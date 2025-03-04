// Directives/CheckboxGroupDirective/checkboxGroupDirective.js
(function () {
  "use strict";

  angular
    .module("job_listing")
    .directive("checkboxGroupDirective", checkboxGroupDirective);

  function checkboxGroupDirective() {
    return {
      restrict: "E",
      scope: {
        items: "=",
      },
      templateUrl:
        "./Directives/CheckboxGroupDirective/checkboxGroupDirective.html",
      link: function (scope, element, attrs) {
        scope.toggleCheck = function (item) {
          item.checked = !item.checked;
        };
      },
    };
  }
})();
