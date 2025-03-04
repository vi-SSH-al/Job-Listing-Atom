"use strict";
var app = angular.module("job_listing", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    // templateUrl: "./Components/Demo/demo.html",
    templateUrl: "./Directives/jobList/jobList.html",
    // templateUrl: "./Directives/navbar/navbar.html",
    // controller: "demoController",
    controller: "jobListController",
    // controller: "navbarController",
  });
  $routeProvider.when("/navbar", {
    templateUrl: "./Directives/navbar/navbar.html",
    controller: "navbarController",
  });
});
