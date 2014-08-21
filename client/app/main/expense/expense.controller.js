'use strict';

angular.module('expensesTrackerApp')
  .controller('ExpenseCtrl', function ($scope, $modalInstance, Expense, selectedExpense) {
    $scope.errors = {};
    $scope.expense = angular.copy(selectedExpense) || {};    

    $scope.submit = function(form) {
        console.log('submit');
      var promise = ($scope.expense._id) ? $scope.update() : $scope.create();
      promise.then(function(result){
        $scope.expense._id = result._id;
        $modalInstance.close($scope.expense);
      }).catch(function(err) {
        angular.forEach(err.data.errors, function(error, key) {
          form[key].$setValidity('mongoose', false);
          $scope.errors[key] = error.message;
        });
      });
    };

    $scope.update = function () {
      return Expense.update({_id: $scope.expense._id}, $scope.expense).$promise;

      // , function(){
      //   $modalInstance.close();
      //   angular.copy($scope.expense, selectedExpense);
      // });
        //});
    };

    $scope.create = function () {
      return Expense.save($scope.expense).$promise;
      // , function(){
      //   $modalInstance.close();
      //   $modalInstance.close($scope.expense);
      // });
        //});
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // $scope.expenses = [];

    // $http.get('/api/expenses').success(function(expenses) {
    //   $scope.expenses = expenses;
    // });

    // $scope.edit = function(expense) {
    //   $modal.open({
    //     templateUrl: 'app/main/expense/expense.html'
    //   });
    // };

    // $scope.addExpense = function() {
    //   if($scope.newExpense === '') {
    //     return;
    //   }
    //   $http.post('/api/expenses', { name: $scope.newExpense });
    //   $scope.newExpense = '';
    // };

    // $scope.deleteExpense = function(expense) {
    //   $http.delete('/api/expenses/' + expense._id);
    // };
  });