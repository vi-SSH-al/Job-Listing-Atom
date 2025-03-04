"use strict";
angular
  .module("job_listing")
  .controller("jobListController", function ($scope, $http) {
    $http
      .get("/secret.json")
      .then(function (response) {
        $scope.jobs = response.data;
        console.log($scope.jobs);
      })
      .catch(function (error) {
        console.error("Error loading job data: ", error);
      });
    $scope.data = "qwert.......";
  });
