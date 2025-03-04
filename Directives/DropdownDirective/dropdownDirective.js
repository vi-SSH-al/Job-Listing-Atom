// Directives/DropdownDirective/dropdownDirective.js
(function () {
  "use strict";

  angular
    .module("job_listing")
    .directive("dropdownDirective", dropdownDirective);

  function dropdownDirective() {
    return {
      restrict: "E",
      scope: {
        options: "=",
        selected: "=",
      },
      templateUrl: "Directives/DropdownDirective/dropdownDirective.html",
      link: function (scope, element, attrs) {
        scope.isOpen = false;

        scope.toggleDropdown = function () {
          scope.isOpen = !scope.isOpen;
        };

        scope.selectOption = function (option) {
          scope.selected = option.value;
          scope.isOpen = false;
        };

        scope.getSelectedLabel = function () {
          if (!scope.selected || !scope.options) return "";

          var selectedOption = scope.options.find(function (option) {
            return option.value === scope.selected;
          });

          return selectedOption ? selectedOption.label : "";
        };
      },
    };
  }
})();
