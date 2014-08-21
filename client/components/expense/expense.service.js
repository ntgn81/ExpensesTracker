'use strict';

angular.module('expensesTrackerApp')
  .service('Expense', function($resource, $location, Auth) {
    var interceptor = {
      responseError: function(response) {
        if(response.status === 401) {
          Auth.logout();
          $location.path('/login');          
        }
      }      
    };
    return $resource('api/expenses/:_id', {
      token: function() {
        return Auth.getCurrentUser().token;
      }
    }, {
      query: {
        method: 'GET',
        isArray: true,
        interceptor: interceptor
      },
      update: {
        method: 'PUT'
      },
      getWeeklyExpenses: {
        method: 'GET',
        isArray: true,
        params: {
          _id: 'weekly'
        },
        interceptor: interceptor      
      }
    });
  });