'use strict';

angular.module('expensesTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.utils'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push('authInterceptor');
  })
  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (Auth.isLoggedIn()) {
        if (next.originalPath === '/signup' || next.originalPath === '/login') {
          $location.path('/');
        }
      }
      else if (next.authenticate) {
        $location.path('/login');
      }
    });
  });