angular.module("logoutCtrlModule", ['LoginService'])
    .controller("LogoutCtrl", ["$scope", "loginServ", '$state', function ($scope, loginServ, $state) {
        $scope.Name = null;
        const token = localStorage.getItem('token');
        if (token) {
            loginServ.ensureAuthenticated(token)
                .then((user) => {
                    if (user.data.status === 'success');
                    $scope.isLoggedIn = true;
                    $scope.wat = user.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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