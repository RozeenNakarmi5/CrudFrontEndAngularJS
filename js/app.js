(function () {
    'use strict';
    var app = angular.module('employeeApp', ["LoginService", "ngRoute", "employeeCtrlModule", "popupModule", "homeCtrlModule", "ui.router"
        , "ngAnimate", "ui.bootstrap", "departmentCtrlModule", "projectCtrlModule", 'ngMaterial', 'ngMessages'
        , "loginCtrlModule", "clientCtrlModule", "uploadCtrlModule", "logoutCtrlModule"]);
    app.run(function ($rootScope, $location, $http) {
        $rootScope.location = $location;
        $rootScope.$on('$stateChangeStart', (e, toState, toStateParams, toParams, fromState, fromParams) => {
            const token = localStorage.getItem('token');
            if (toState.data.ensureAuthenticated) {
                if (!token) {
                    if (localStorage.length === 0) {
                        $location.path("/login");
                    }
                }
                else {
                    let jwtData = token.split('.')[1];
                    let decodedJwtJsonData = window.atob(jwtData);
                    let decodedJwtData = JSON.parse(decodedJwtJsonData);
                    let role = decodedJwtData.role;
                    let isAuthorized = false;
                    angular.forEach(toState.data.role, function (v, k) {
                        if (v === role) {
                            isAuthorized = true;
                        }
                    });
                    if (isAuthorized === true) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    }
                    else {
                        $http.defaults.headers.common.Authorization = ' ';
                    }

                }
            }
        });
    })
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $stateProvider

                .state('home', {
                    url: "/",
                    templateUrl: "views/home.html",
                    controller: "HomeCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Admin', 'Team Leads', 'Employees']
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "views/Login/login.html",
                    controller: "LoginCtrl"
                })
                .state('logout', {
                    controller: "LogoutCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Admin', 'Team Leads', 'Employees']
                    }
                })

                .state('employee', {
                    url: "/Employee",
                    templateUrl: "views/employeeCrud.html",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Admin', 'Team Leads']
                    }

                })
                .state('employee.currentemployee', {
                    url: "/CurrentEmployee",
                    templateUrl: "views/currentEmployee.html",
                    controller: "EmployeeCtrl"                })
                .state('employee.pastemployee', {
                    url: "/PastEmployee",
                    templateUrl: "views/pastEmployee.html",
                    controller: "NotWorkingEmployeeCtrl",
                    data: {
                        ensureAuthenticated: true
                    }
                })
                .state('department', {
                    url: "/Department",
                    templateUrl: "views/department.html",
                    controller: "DepartmentCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Admin', 'Team Leads']
                    }
                })
                .state('project', {
                    url: "/Project",
                    templateUrl: "views/Projects/ProjectHome.html",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Team Leads']
                    }
                })
                .state('project.current', {
                    url: "/CurrentProject",
                    templateUrl: "views/Projects/currentProjects.html",
                    controller: "projectCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Team Leads']
                    }
                })
                .state('project.scrap', {
                    url: "/GetScrap",
                    templateUrl: "views/Projects/scrapProjects.html",
                    controller: "scrapCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Team Leads']
                    }
                })
                .state('clients', {
                    url: "/client",
                    templateUrl: "views/clients/clientHome.html",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Team Leads']
                    }
                })
                .state('clients.list', {
                    url: "/ListClient",
                    templateUrl: "views/clients/clientList.html",
                    controller: "clientCtrl",
                })
                .state('clients.crud', {
                    url: "/SetClient",
                    templateUrl: "views/clients/clientCRUD.html",
                    controller: "setClientCtrl",
                    data: {
                        ensureAuthenticated: true,
                        role: ['Team Leads']
                    }
                })
                .state('403', {
                    url: "/403",
                    templateUrl: 'views/Forbidden/forbidden.html',
                    data: {
                        ensureAuthenticated: true
                    }
                })

            $urlRouterProvider.otherwise('/login');
        }
    ])
    app.factory('authInterceptor', function ($q, $location) {
        return {
            responseError(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/403');
                 
                }
                return $q.reject(response);
            }
        };
    })
})();

