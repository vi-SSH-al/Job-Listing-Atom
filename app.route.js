"use strict";
var app = angular.module("job_listing", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "./Components/Demo/demo.html",
    controller: "demoController",
  });
});
