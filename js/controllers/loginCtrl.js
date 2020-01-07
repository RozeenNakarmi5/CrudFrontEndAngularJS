angular.module("loginCtrlModule",['LoginService'])
.controller("LoginCtrl",["$scope","loginServ",'$state', function($scope,loginServ,$state){
    $scope.onLogin = function ()
    {
        var loginData = {
            userName : $scope.userName,
            password : $scope.password
        }
        var loogin = loginServ.login(loginData);
        loogin.then(function(user) {
            localStorage.setItem('token', user.data.token);
            alert("login Successfull");
            $state.go('home', null, {reload: true});

        },function(error){
            alert("Invalid Username or password");
            $scope.userName="";
            $scope.password="";
            console.log("Error: "+ error)
        });
    }
    $scope.logout = function()
    {
        if (confirm('Are you sure you want to Logout?'))
        {
            const token = localStorage.getItem('token');
            let jwtData = token.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            let role = decodedJwtData.role;
            if (role === 'Admin' || role === 'Team Leads')
            {
                var loogout = loginServ.logout();
                loogout.then(function (){
                    alert("Loged out");
                    localStorage.removeItem('token');
                    $state.go('login');
                })
            }
            
        }
        
    }
}])