'use strict';

angular.module('expensesTrackerApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    var currentUser = {};

    if ($cookieStore.get('token')) {
      currentUser.token = $cookieStore.get('token');
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/auth', {
          params: {
            email: user.email,
            password: user.password            
          }
        }).
        success(function(data) {
          currentUser.token = data.token;
          $cookieStore.put('token', data.token);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          currentUser.token = data.token;
          $cookieStore.put('token', data.token);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return $cookieStore.get('token') ? true : false;
      }
    };
  });
