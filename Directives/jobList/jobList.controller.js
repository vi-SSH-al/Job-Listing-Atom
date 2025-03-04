"use strict";
angular
  .module("job_listing")
  .controller("jobListController", function ($scope, $http) {
    
    // Initialize arrays
    $scope.appliedByMe = [];
    $scope.postedByMe = [];
    $scope.allOpportunities = [];

    // Fetch job data
    $http
      .get("./secret.json")
      .then(function (response) {
        $scope.jobs = response.data;
        
        // Assign filtered data
        $scope.allOpportunities = $scope.jobs;
        $scope.postedByMe = $scope.jobs.filter((job) => job.status === "posted");
        $scope.appliedByMe = $scope.jobs.filter((job) => job.status === "applied");

        // Log values directly after data is loaded
        console.log("All Opportunities:", $scope.allOpportunities);
        console.log("Posted By Me:", $scope.postedByMe);
        console.log("Applied By Me:", $scope.appliedByMe);
      })
      .catch(function (error) {
        console.error("Error loading job data: ", error);
      });

  });
