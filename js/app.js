var app= angular.module('employeeApp', ["employeeCtrlModule","popupModule","homeCtrlModule","ui.router"
,"ngTouch", "ngAnimate", "ui.bootstrap", "projectCtrlModule"]);

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