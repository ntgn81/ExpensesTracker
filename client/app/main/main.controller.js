'use strict';

angular.module('expensesTrackerApp')
  .filter('formatDate', function() {
    return function(d) {
      if (d) {
        return d.slice(0, 4) + '-' + d.slice(4,6) + '-' + d.slice(6);
      }
    };
  })
  .filter('formatTime', function() {
    return function(d) {
      if (d) {
        return d.slice(0, 2) + ':' + d.slice(2);
      }
    };
  })
  .controller('MainCtrl', function ($scope, $http, $modal, Expense) {
    $scope.expenses = Expense.query();

    $scope.edit = function(expense) {
      $modal.open({
        templateUrl: 'app/main/expense/expense.html',
        controller: 'ExpenseCtrl',
        keyboard: false,
        resolve: {
          selectedExpense: function() {
            return expense;
          }
        }
      }).result.then(function(updatedExpense) {
        angular.copy(updatedExpense, expense);
      });
    };

    $scope.add = function() {
      $modal.open({
        templateUrl: 'app/main/expense/expense.html',
        controller: 'ExpenseCtrl',
        keyboard: false,
        resolve: {
          selectedExpense: null
        }
      }).result.then(function(newExpense) {
        $scope.expenses.push(newExpense);
      });
    };

    $scope.delete = function(expense) {
      Expense.remove({
        _id: expense._id
      });
      $scope.expenses.splice($scope.expenses.indexOf(expense), 1);
    };
  });