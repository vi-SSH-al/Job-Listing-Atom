"use strict";
angular.module("job_listing").directive("navbar", function ($document) {
  return {
    restrict: "E",
    templateUrl: "./Directives/navbar/navbar.html",
    controller: function ($scope) {
      $scope.menuOpen = false;

      // Logo Image URL
      $scope.logoUrl =
        "https://media.licdn.com/dms/image/v2/D5622AQE9zq12SHD6sA/feedshare-shrink_800/B56ZUY4KjhHQAg-/0/1739879136122?e=2147483647&v=beta&t=3gNRg4sDzYd7XY2dgYOkZ2VrnKTrTmkQn1QdrxHnD10";

      // Toggle Mobile Menu
      $scope.toggleMenu = function () {
        $scope.menuOpen = !$scope.menuOpen;
        console.log("object");
      };

      // Close menu when clicking outside
      $document.on("click", function (event) {
        var isClickedInside = angular
          .element(event.target)
          .closest(".navbar, .dropDownMenuForNavbar").length;
        if (!isClickedInside) {
          $scope.$apply(function () {
            $scope.menuOpen = false;
          });
        }
      });
    },
  };
});
