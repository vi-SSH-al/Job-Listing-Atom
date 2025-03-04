"use strict";
angular.module("job_listing").directive("jobListDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./Directives/jobList/jobList.directive.html",
    scope: {},
    controller: function ($scope, $http, $sce) {
      // Initialize arrays
      $scope.appliedByMe = [];
      $scope.postedByMe = [];
      $scope.allOpportunities = [];
      $scope.jobs = [];
      $scope.lengthOfData = 0;

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
        $scope.jobs = $scope.allOpportunities.filter(
          (job) => job.status === "posted"
        );
        $scope.lengthOfData = $scope.jobs.length;
      };

      // Function to filter jobs applied by the user
      $scope.setAppliedByMe = function () {
        $scope.jobs = $scope.allOpportunities.filter(
          (job) => job.status === "applied"
        );
        $scope.lengthOfData = $scope.jobs.length;
      };

      // Watch jobs array for changes
      $scope.$watch(
        "jobs",
        function (newVal) {
          $scope.lengthOfData = newVal.length;
        },
        true
      );

      //Format timeAgo
      $scope.timeAgo = function (postedAt) {
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
      
      //Format salary
      $scope.formatSalary = function (salary) {
        if (!salary || (salary.min_salary === 0 && salary.max_salary === 0)) {
          return "Not Specified";
        }
        if (salary.min_salary && !salary.max_salary) {
          return `Min ${salary.currency} ${salary.min_salary} / year`;
        }
        if (!salary.min_salary && salary.max_salary) {
          return `Max ${salary.currency} ${salary.max_salary} / year`;
        }
        return `${salary.currency} ${salary.min_salary} - ${salary.max_salary} / year`;
      };

      //isRecent
      $scope.isRecent = function (postedAt) {
        const postedDate = new Date(postedAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - postedDate) / 1000);
        const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

        return diffInDays < 5; // Returns true if within 5 days
      };

      //apply
      $scope.applyFun = function (status, deadline) {
        if (status === "applied") {
          return {text: `Applied`};
        }

        const deadlineDate = new Date(deadline);
        const today = new Date();

        // Calculate the number of days left
        const timeDiff = deadlineDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
        console.log("Days left are "+daysLeft);

        let text = '';
        if (daysLeft < 13) {
          text = `Apply in ${daysLeft} days`;
        }else {
          text = `Apply by ${deadline}`;
        }

        console.log(text);
        
        return {text: text, daysLeft: daysLeft}
      };
    },
  };
});
