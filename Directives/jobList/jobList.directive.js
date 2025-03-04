"use strict";
angular
  .module("job_listing")
  .directive("jobListDirective", function () {
    return {
      restrict: "E",
      templateUrl: "./Directives/jobList/jobList.directive.html",
      scope: {},
      controller: function ($scope, $http) {
        // Initialize arrays
        $scope.appliedByMe = [];
        $scope.postedByMe = [];
        $scope.allOpportunities = [];
        $scope.jobs = [];
        $scope.lengthOfData = 0;
        $scope.lengthOfData1 = 0;

        // Fetch job data
        $http
          .get("./secret.json")
          .then(function (response) {
            $scope.jobs = response.data;
            $scope.allOpportunities = $scope.jobs; // Store all opportunities
            $scope.lengthOfData = $scope.jobs.length; // Set initial count
            console.log("All Opportunities:", $scope.allOpportunities);
          })
          .catch(function (error) {
            console.error("Error loading job data:", error);
          });

        // Function to set all opportunities
        $scope.setAllOpportunities = function () {
          $scope.jobs = $scope.allOpportunities;
          $scope.lengthOfData = $scope.jobs.length;
        };

        // Function to filter jobs posted by the user
        $scope.setPostedByMe = function () {
          $scope.jobs = $scope.allOpportunities.filter((job) => job.status === "posted");
          $scope.lengthOfData = $scope.jobs.length;
        };

        // Function to filter jobs applied by the user
        $scope.setAppliedByMe = function () {
          $scope.jobs = $scope.allOpportunities.filter((job) => job.status === "applied");
          $scope.lengthOfData = $scope.jobs.length;
        };

        // Watch jobs array for changes
        $scope.$watch("jobs", function (newVal) {
          $scope.lengthOfData = newVal.length;
        }, true);
      },
    };
  });
