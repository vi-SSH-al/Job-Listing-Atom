"use strict";

angular
  .module("job_listing")
  .controller("MainController", function ($scope, $rootScope) {
    // console.log($scope.opportunityTypes);
    $scope.filters = {
      showOpenOnly: false,
      industries: [],
      opportunityTypes: [
        { id: "fullTime", label: "Full Time", checked: false },
        { id: "partTime", label: "Part Time", checked: false },
        {
          id: "contractual",
          label: "Contractual/Freelancer",
          checked: false,
        },
        { id: "internship", label: "Internship", checked: false },
      ],
      locations: [],
      workplaceTypes: [
        { id: "onsite", label: "On-site / Work from office", checked: false },
        { id: "remote", label: "Remote / Work from home", checked: false },
        { id: "hybrid", label: "Hybrid", checked: false },
      ],
      workExperience: {
        experienced: false,
        fresher: false,
        minYears: "",
        maxYears: "",
      },
      salary: {
        min: "",
        max: "",
        currency: "INR",
        rate: "per year",
      },
      skills: [],
      currencyOptions: [
        { value: "INR", label: "INR" },
        { value: "USD", label: "USD" },
      ],
      rateOptions: [
        { value: "per year", label: "per year" },
        { value: "per month", label: "per month" },
        { value: "per hour", label: "per hour" },
      ],
      yearsOptions: [
        { value: "1", label: "1 year" },
        { value: "2", label: "2 years" },
        { value: "3", label: "3 years" },
        { value: "5", label: "5 years" },
        { value: "10", label: "10 years" },
      ],
    };

    // Currency options

    // Rate options

    // Experience options

    // Toggle filter sections
    $scope.toggleSection = function (section) {
      $scope[section + "Expanded"] = !$scope[section + "Expanded"];
    };
    $scope.toggleSection = function (section) {
      $scope[section + "Expanded"] = !$scope[section + "Expanded"];
    };

    // Helper functions for the experience section
    $scope.isExperienced = function () {
      return $scope.filters.workExperience.type === "experienced";
    };

    $scope.isFresher = function () {
      return $scope.filters.workExperience.type === "fresher";
    };

    $scope.setExperienceType = function (type) {
      $scope.filters.workExperience.type = type;
    };

    $scope.isSelected = function (type) {
      return $scope.filters.workExperience.type === type;
    };

    // Initialize expanded sections
    $scope.industryExpanded = true;
    $scope.opportunityTypeExpanded = true;
    $scope.locationExpanded = true;
    $scope.workplaceTypeExpanded = true;
    $scope.salaryExpanded = true;
    $scope.workExperienceExpanded = true;
    $scope.skillsExpanded = true;

    $scope.toggleRadio = function () {
      $scope.model = $scope.value;
    };

    // Apply filters
    $scope.applyFilters = function () {
      // Logic to apply filters would go here
      console.log("Filters applied:", $scope.filters);
      $rootScope.$broadcast("filtersApplied", $scope.filters);
    };

    // Reset filters
    $scope.resetFilters = function () {
      // Reset logic
    };
  });
