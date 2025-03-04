"use strict";
var app = angular.module("job_listing", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    // templateUrl: "./Components/Demo/demo.html",
    templateUrl: "./Components/navbar/navbar.component.html",
    // controller: "demoController",
    controller: "navbarController",
  });
  $routeProvider.when("/navbar", {
    templateUrl: "./Components/navbar/navbar.component.html",
    controller: "navbarController",
  });
});
