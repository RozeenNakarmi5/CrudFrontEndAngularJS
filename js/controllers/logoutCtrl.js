angular.module("logoutCtrlModule", ['LoginService'])
    .controller("LogoutCtrl", ["$scope", "loginServ", '$state', function ($scope, loginServ, $state) {
        $scope.logout = function () {
            if (confirm('Are you sure you want to Logout?')) {
                $state.go('logout');
                var loogout = loginServ.logout();
                loogout.then(function () {
                    localStorage.removeItem('token');
                    $state.go('login');
                })
            }
        }
    }
    ]);