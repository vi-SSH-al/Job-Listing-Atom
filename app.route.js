"use strict";
var app = angular.module("job_listing", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "./Components/Demo/demo.html",
    controller: "demoController",
  });
  $routeProvider.when("/navbar", {
    templateUrl: "./Components/navbar/navbar.component.html",
    controller: "navbarController",
  });
});
