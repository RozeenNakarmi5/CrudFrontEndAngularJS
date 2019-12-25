var app= angular.module('employeeApp', ["employeeCtrlModule","popupModule","homeCtrlModule","ui.router"
, "ngAnimate", "ui.bootstrap","departmentCtrlModule",  "projectCtrlModule",'ngMaterial', 'ngMessages']);
// app.config(['$routeProvider',function($routeProvider){
//     $routeProvider
//         .when("/",{
//             templateUrl:"views/home.html",
//             controller:"HomeCtrl"
//         })
//         .when("/Employee",{
//             templateUrl:"views/employeeCrud.html",
//         })
//         .when("/Employee/PastEmployee", {
//             templateUrl:"views/pastEmployee.html",
//             controller: "NotWorkingEmployeeCtrl"
//         })
//         .when("/Employee/CurrentEmployee",{
//             templateUrl:"views/currentEmployee.html",
//             controller: "EmployeeCtrl"
//         })
// }])
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider)
    {
        $stateProvider
        .state('home',{
            url:"/",
            templateUrl:"views/home.html",
            controller:"HomeCtrl"
        })
        .state('employee',{
            url: "/Employee",
            templateUrl:"views/employeeCrud.html"
        })
        .state('employee.currentemployee',{
            url: "/CurrentEmployee",
            templateUrl:"views/currentEmployee.html",
            controller: "EmployeeCtrl"
        })
        .state('employee.pastemployee',{
            url:"/PastEmployee",
            templateUrl:"views/pastEmployee.html",
            controller: "NotWorkingEmployeeCtrl"
        })
        .state('department',{
            url: "/Department",
            templateUrl: "views/department.html",
            controller: "DepartmentCtrl"
        })
		.state('project',{
            url: "/Project",
            templateUrl:"views/Projects/ProjectHome.html"

        })
        .state('project.current',{
            url: "/CurrentProject",
            templateUrl:"views/Projects/currentProjects.html",
            controller :"projectCtrl"
        })
        .state('project.scrap',{
            url: "/GetScrap",
            templateUrl:"views/Projects/scrapProjects.html",
            controller :"scrapCtrl"
        })
        
        $urlRouterProvider.otherwise('/');
    }

])