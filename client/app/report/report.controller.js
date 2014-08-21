'use strict';

angular.module('expensesTrackerApp')
  .controller('ReportCtrl', function ($scope, $http, $modal, Expense) {
    $scope.weeklyExpenses = Expense.getWeeklyExpenses();
  });