(function() {
    'use strict';
angular.module('LoginService', [])
.service('loginServ', function($http)
{
    const APIURL ="http://localhost:8812/api/login/";
 
    this.login = function(user) {
        return $http({
          method: 'POST',
          url: APIURL,
          data: user,
          headers: {'Content-Type': 'application/json'}
        });
      };
    this.logout  = function()
    {
      return $http.put(APIURL + "Logout")
    }
    this.ensureAuthenticated = function(token) {
    return $http({
        method: 'GET',
        url: 'http://localhost:8812/api/user/' + 'UserDetail',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        }
    });
    };
})
})();
