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
        // console.log("asdad", scope.items);
        scope.toggleCheck = function (item) {
          console.log("berofre", item.checked);
          item.checked = !item.checked;
          console.log("After", item.checked);
        };
      },
    };
  }
})();
