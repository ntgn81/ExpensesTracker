'use strict';

angular.module('expensesTrackerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/report', {
        templateUrl: 'app/report/report.html',
        controller: 'ReportCtrl',
        authenticate: true
      });
  });