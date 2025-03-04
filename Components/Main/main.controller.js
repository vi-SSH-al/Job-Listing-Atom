"use strict";

angular.module("job_listing").controller("MainController", function ($scope) {
  $scope.industries = [
    "Information Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Construction",
    "Real Estate",
    "Telecommunications",
    "Automotive",
    "Hospitality",
    "Agriculture",
    "Pharmaceuticals",
    "Media & Entertainment",
    "Energy & Utilities",
    "Legal Services",
    "Transportation & Logistics",
    "E-commerce",
    "Government & Public Sector",
    "Aerospace & Defense",
  ];

  $scope.skills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Cloud Computing",
    "Cybersecurity",
    "Project Management",
    "Data Analysis",
    "UI/UX Design",
    "DevOps",
    "Blockchain",
    "Networking",
    "Digital Marketing",
    "Business Analysis",
    "Artificial Intelligence",
    "Software Testing",
    "Mobile App Development",
    "Game Development",
    "Embedded Systems",
    "Web Development",
    "Graphic Design",
  ];

  $scope.locations = [
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Houston",
    "London",
    "Berlin",
    "Sydney",
    "Toronto",
    "Mumbai",
    "Paris",
    "Dubai",
    "Tokyo",
    "Singapore",
    "Bangkok",
    "Madrid",
    "Barcelona",
    "Rome",
    "Amsterdam",
    "Hong Kong",
    "Kuala Lumpur",
    "Shanghai",
    "Seoul",
    "Bangalore",
    "Melbourne",
    "Mexico City",
    "São Paulo",
    "Jakarta",
    "Istanbul",
    "Moscow",
  ];

  $scope.opportunityTypes = [
    { id: "fullTime", label: "Full-time", checked: false },
    { id: "partTime", label: "Part-time", checked: false },
    {
      id: "contractual",
      label: "Contractual / Freelance work",
      checked: false,
    },
    { id: "internship", label: "Internship", checked: false },
  ];
  // console.log($scope.opportunityTypes);
  $scope.filters = {
    showOpenOnly: false,
    industries: [],
    opportunityTypes: [
      { id: "fullTime", label: "Full-time", checked: false },
      { id: "partTime", label: "Part-time", checked: false },
      {
        id: "contractual",
        label: "Contractual / Freelance work",
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
    console.log("Filters applied:", $scopefilters);
  };

  // Reset filters
  $scope.resetFilters = function () {
    // Reset logic
  };
});
