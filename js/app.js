var app= angular.module('employeeApp', ["ngRoute","employeeCtrlModule","homeCtrlModule"]);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl:"views/home.html",
            controller:"HomeCtrl"
        })
        .when("/Employee",{
            templateUrl:"views/employeeCrud.html",
            controller: "EmployeeCtrl"
        })
}])