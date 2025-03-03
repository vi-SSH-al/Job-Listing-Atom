angular
  .module("job_listing", [])
  .directive("multiSelectFilterDropdown", function () {
    return {
      restrict: "E",
      templateUrl: "",
      scope: {
        items: "=",
        title: "@",
        backgroundColor: "@?",
      },
      controller: function ($scope) {
        // Initialize variables
        $scope.selectedItems = [];
        $scope.searchText = "";
        $scope.isOpen = false;

        // Set default background color if not provided
        if (!$scope.backgroundColor) {
          $scope.backgroundColor = "#EBF3FC";
        }

        // Toggle dropdown visibility
        $scope.toggleDropdown = function () {
          $scope.isOpen = !$scope.isOpen;
          // Clear search text when closing
          if (!$scope.isOpen) {
            $scope.searchText = "";
          }
        };

        // Add item to selection
        $scope.selectItem = function (item) {
          if (!$scope.isItemSelected(item)) {
            $scope.selectedItems.push(item);
            $scope.searchText = "";
          }
        };

        // Add custom item from search text
        $scope.addCustomItem = function () {
          if ($scope.searchText && !$scope.isItemSelected($scope.searchText)) {
            $scope.selectedItems.push($scope.searchText);
            $scope.searchText = "";
          }
        };

        // Check if there are matching results
        $scope.hasNoResults = function () {
          return $scope.searchText && $scope.getFilteredItems().length === 0;
        };

        // Remove item from selection
        $scope.removeItem = function (item) {
          var index = $scope.selectedItems.indexOf(item);
          if (index !== -1) {
            $scope.selectedItems.splice(index, 1);
          }
        };

        // Check if item is already selected
        $scope.isItemSelected = function (item) {
          return $scope.selectedItems.indexOf(item) !== -1;
        };
      },
    };
  });
