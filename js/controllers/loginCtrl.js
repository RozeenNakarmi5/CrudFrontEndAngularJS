angular.module("loginCtrlModule", ['LoginService'])
    .controller("LoginCtrl", ["$scope", "loginServ", '$state', function ($scope, loginServ, $state) {
        $scope.onLogin = function () {
            var loginData = {
                userName: $scope.userName,
                password: $scope.password
            }
            var loogin = loginServ.login(loginData);
            loogin.then(function (user) {
                localStorage.setItem('token', user.data.token);
                alert("login Successfull");
                $state.go('home', null, { reload: true });

            }, function (error) {
                if (error.status === 404)
                {
                    alert("Invalid Username or password");
                    $scope.userName = "";
                    $scope.password = "";
                    console.log("Error: " + error)
                }
                else if (error.status === 400)
                {
                    alert("User alredy logged in");
                    $scope.userName = "";
                    $scope.password = "";
                }
                
            });
        }
    }])