"use strict";
angular
  .module("job_listing")
  .directive("jobListDirective", function () {
    
    return {
      restrict: "E",
      templateUrl: "./Directives/jobList/jobList.directive.html",
      scope: {},
      controller: function ($scope, $http){
      // Initialize arrays
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
        
        $scope.timeAgo = function (postedAt){
          if (!postedAt) return "";
          let postedDate = new Date(postedAt);
          let now = new Date();
          let diffInSeconds = Math.floor((now - postedDate) / 1000);
          
          if (diffInSeconds < 60) {
            return `Posted ${diffInSeconds} seconds ago`;
          } else if (diffInSeconds < 3600) {
            let minutes = Math.floor(diffInSeconds / 60);
            return `Posted ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
          } else if (diffInSeconds < 86400) {
            let hours = Math.floor(diffInSeconds / 3600);
            return `Posted ${hours} hour${hours > 1 ? "s" : ""} ago`;
          } else if (diffInSeconds < 604800) {
            let days = Math.floor(diffInSeconds / 86400);
            return `Posted ${days} day${days > 1 ? "s" : ""} ago`;
          } else if (diffInSeconds < 2592000) {
            let weeks = Math.floor(diffInSeconds / 604800);
            return `Posted ${weeks} week${weeks > 1 ? "s" : ""} ago`;
          } else if (diffInSeconds < 31536000) {
            let months = Math.floor(diffInSeconds / 2592000);
            return `Posted ${months} month${months > 1 ? "s" : ""} ago`;
          } else {
            let years = Math.floor(diffInSeconds / 31536000);
            return `Posted ${years} year${years > 1 ? "s" : ""} ago`;
          }
        };

        // Function to handle salary display logic
        $scope.formatSalary = function (salary) {
          if (!salary || (salary.min_salary === 0 && salary.max_salary === 0)) {
            return "Not Specified";
          }
          if (salary.min_salary && salary.max_salary === 0) {
            return `Min ${salary.currency} ${salary.min_salary} / year`;
          }
          if (salary.min_salary === 0 && salary.max_salary) {
            return `Max ${salary.currency} ${salary.max_salary} / year`;
          }
          return `${salary.currency} ${salary.min_salary} - ${salary.max_salary} / year`;
        };

      }



    };
   

  });
