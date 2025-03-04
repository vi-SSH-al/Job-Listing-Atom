"use strict";
angular.module("job_listing").directive("jobListDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./Directives/jobList/jobList.directive.html",
    scope: {},
    controller: function ($scope, $http, $rootScope) {
      // Initialize arrays
      $scope.appliedByMe = [];
      $scope.postedByMe = [];
      $scope.allOpportunities = [];
      $scope.filteredJobs = [];
      // Fetch job data
      $http
        .get("./secret.json")
        .then(function (response) {
          $scope.jobs = response.data;
          console.log($scope.jobs);

          // Store the full list for filtering later
          $scope.allOpportunities = $scope.jobs;
          $scope.postedByMe = $scope.jobs.filter(
            (job) => job.status === "posted"
          );
          $scope.appliedByMe = $scope.jobs.filter(
            (job) => job.status === "applied"
          );

          // Initialize filteredJobs with all opportunities
          $scope.filteredJobs = $scope.allOpportunities;

          console.log("All Opportunities:", $scope.allOpportunities);
          console.log("Posted By Me:", $scope.postedByMe);
          console.log("Applied By Me:", $scope.appliedByMe);
        })
        .catch(function (error) {
          console.error("Error loading job data: ", error);
        });

      // Listen for the filtersApplied event
      $scope.$on("filtersApplied", function (event, filters) {
        applyJobFilters(filters);
      });

      // Filtering logic based on filter criteria
      function applyJobFilters(filters) {
        console.log("filres h ", filters);
        let filtered = $scope.allOpportunities;

        // Example: Show only open opportunities if selected (assume "not applied" means open)
        if (filters.showOpenOnly) {
          filtered = filtered.filter((job) => job.status === "not applied");
        }

        // Filter by opportunity type if any are checked
        let selectedOppTypes = filters.opportunityTypes
          .filter((type) => type.checked)
          .map((type) => type.label);
        if (selectedOppTypes.length > 0) {
          filtered = filtered.filter((job) =>
            selectedOppTypes.includes(job.opportunity_type)
          );
        }
        console.log(selectedOppTypes);
        // Filter by industry if any are selected (assuming filters.industries contains industry names)
        if (filters.industries && filters.industries.length > 0) {
          filtered = filtered.filter((job) =>
            filters.industries.includes(job.industry)
          );
        }

        // Filter by location if any are selected (assuming filters.locations contains location names)
        if (filters.locations && filters.locations.length > 0) {
          filtered = filtered.filter((job) =>
            filters.locations.includes(job.location)
          );
        }

        // Filter by workplace type if any are checked
        let selectedWorkplaceTypes = filters.workplaceTypes
          .filter((type) => type.checked)
          .map((type) => type.label);
        if (selectedWorkplaceTypes.length > 0) {
          filtered = filtered.filter((job) =>
            selectedWorkplaceTypes.includes(job.workplace_type)
          );
        }

        // Filter by salary range if provided
        if (filters.salary.min) {
          filtered = filtered.filter(
            (job) => job.salary.min_salary >= parseFloat(filters.salary.min)
          );
        }
        if (filters.salary.max) {
          filtered = filtered.filter(
            (job) => job.salary.max_salary <= parseFloat(filters.salary.max)
          );
        }

        // Filter by work experience based on type and years
        if (filters.workExperience.type === "experienced") {
          if (filters.workExperience.minYears) {
            filtered = filtered.filter(
              (job) =>
                job.work_experience.experience_required.min_year >=
                parseInt(filters.workExperience.minYears)
            );
          }
          if (filters.workExperience.maxYears) {
            filtered = filtered.filter(
              (job) =>
                job.work_experience.experience_required.max_year <=
                parseInt(filters.workExperience.maxYears)
            );
          }
        } else if (filters.workExperience.type === "fresher") {
          filtered = filtered.filter(
            (job) => job.work_experience.fresher_required === true
          );
        }

        // Filter by skills if any are entered (assuming filters.skills is an array)
        if (filters.skills && filters.skills.length > 0) {
          filtered = filtered.filter((job) => {
            return filters.skills.every((skill) => job.skills.includes(skill));
          });
        }

        // Update the displayed job list with the filtered result
        $scope.filteredJobs = filtered;
        console.log("Filtered Jobs:", $scope.filteredJobs);
        $scope.jobs = $scope.filteredJobs;
      }

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
    },
  };
});
