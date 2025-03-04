// Directives/InputFieldDirective/inputFieldDirective.js
(function () {
  "use strict";

  angular
    .module("job_listing")
    .directive("inputFieldDirective", inputFieldDirective);

  function inputFieldDirective() {
    return {
      restrict: "E",
      scope: {
        fieldType: "@", // 'dropdown' or 'text'
        label: "@", // Field label
        placeholder: "@", // Placeholder text
        model: "=", // Model binding
        options: "=", // For dropdown: array of options {value: '', label: ''}
        required: "=?", // Optional required flag
      },
      templateUrl: "Directives/InputFieldDirective/inputFieldDirective.html",
      link: function (scope, element, attrs) {
        // Initialize
        scope.isDropdownOpen = false;
        scope.required = angular.isDefined(scope.required)
          ? scope.required
          : false;

        // Toggle dropdown
        scope.toggleDropdown = function (event) {
          if (scope.fieldType === "dropdown") {
            scope.isDropdownOpen = !scope.isDropdownOpen;
            event.stopPropagation();
          }
        };

        // Select option from dropdown
        scope.selectOption = function (option) {
          scope.model = option.value;
          scope.isDropdownOpen = false;
        };

        // Get selected option label
        scope.getSelectedLabel = function () {
          if (
            scope.fieldType !== "dropdown" ||
            !scope.model ||
            !scope.options
          ) {
            return scope.placeholder || "";
          }

          var selectedOption = scope.options.find(function (option) {
            return option.value === scope.model;
          });

          return selectedOption
            ? selectedOption.label
            : scope.placeholder || "";
        };

        // Close dropdown when clicking outside
        function documentClickHandler(event) {
          if (scope.isDropdownOpen && !element[0].contains(event.target)) {
            scope.isDropdownOpen = false;
            scope.$apply();
          }
        }

        // Add and remove document click listener
        angular.element(document).on("click", documentClickHandler);
        scope.$on("$destroy", function () {
          angular.element(document).off("click", documentClickHandler);
        });
      },
    };
  }
})();
