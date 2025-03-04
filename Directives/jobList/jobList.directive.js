"use strict";
angular
  .module("job_listing")
  .directive("jobListDirective", function () {
    
    return {
      restrict: "E",
      templateUrl: "./Directives/jobList/jobList.directive.html",
      scope: {},
      controller: function ($scope, $http){
         // // Initialize arrays
      $scope.appliedByMe = [];
      $scope.postedByMe = [];
      $scope.allOpportunities = [];
      

      // Fetch job data
      $http
        .get("./secret.json")
        .then(function (response) {
          $scope.jobs = response.data;
          console.log($scope.jobs);
          
          // Assign filtered data
          $scope.allOpportunities = $scope.jobs;
          
          // Log values directly after data is loaded
          console.log("All Opportunities:", $scope.allOpportunities);
          console.log("Posted By Me:", $scope.postedByMe);
          console.log("Applied By Me:", $scope.appliedByMe);
        })
        .catch(function (error) {
          console.error("Error loading job data: ", error);
        });
        
        $scope.setAllOpportunities =function  (){
          $scope.job = $scope.allOpportunities;
        };
        $scope.setPostedByMe =function  (){
          $scope.postedByMe = $scope.jobs.filter((job) => job.status === "posted");
          $scope.job = $scope.postedByMe;
        };
        
        $scope.setAppliedByMe =function  (){
          $scope.appliedByMe = $scope.jobs.filter((job) => job.status === "applied");
          $scope.job = $scope.appliedByMe;
        };



      }
    };
   

  });
