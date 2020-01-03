var app = angular.module('employeeApp', ["employeeCtrlModule", "popupModule", "homeCtrlModule", "ui.router"
    , "ngTouch", "ngAnimate", "ui.bootstrap", "departmentCtrlModule", "projectCtrlModule",
    "clientCtrlModule", "ngMaterial", "ngMessages", "uploadCtrlModule"]);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html",
                controller: "HomeCtrl"
            })
            .state('employee', {
                url: "/Employee",
                templateUrl: "views/employeeCrud.html"
            })
            .state('employee.currentemployee', {
                url: "/CurrentEmployee",
                templateUrl: "views/currentEmployee.html",
                controller: "EmployeeCtrl"
            })
            .state('employee.pastemployee', {
                url: "/PastEmployee",
                templateUrl: "views/pastEmployee.html",
                controller: "NotWorkingEmployeeCtrl"
            })
            .state('department', {
                url: "/Department",
                templateUrl: "views/department.html",
                controller: "DepartmentCtrl"
            })
            .state('project', {
                url: "/Project",
                templateUrl: "views/Projects/ProjectHome.html"

            })
            .state('project.current', {
                url: "/CurrentProject",
                templateUrl: "views/Projects/currentProjects.html",
                controller: "projectCtrl"
            })
            .state('project.scrap', {
                url: "/GetScrap",
                templateUrl: "views/Projects/scrapProjects.html",
                controller: "scrapCtrl"
            })
            .state('clients', {
                url: "/client",
                templateUrl: "views/clients/clientHome.html",
            })
            .state('clients.list', {
                url: "/ListClient",
                templateUrl: "views/clients/clientList.html",
                controller: "clientCtrl"
            })
            .state('clients.crud', {
                url: "/SetClient",
                templateUrl: "views/clients/clientCRUD.html",
                controller: "setClientCtrl"
            })

        $urlRouterProvider.otherwise('/');
    }

])