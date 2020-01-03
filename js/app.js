(function (){
    'use strict';
var app= angular.module('employeeApp', ["LoginService","ngRoute","employeeCtrlModule","popupModule","homeCtrlModule","ui.router"
, "ngAnimate", "ui.bootstrap","departmentCtrlModule",  "projectCtrlModule",'ngMaterial', 'ngMessages'
, "loginCtrlModule"]);
app.run(function ($rootScope, $location,$http)
{
    $rootScope.location = $location;
    $rootScope.$on('$stateChangeStart', (e, toState,toStateParams ,toParams, fromState, fromParams) => {
        const token = localStorage.getItem('token');  
        if (toState.data.ensureAuthenticated) {
          if (!token) {
              if(localStorage.length === 0)
              {
                $location.path("/login");
              }
          }
          else
          {
            let jwtData = token.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            let role = decodedJwtData.role;
            if(toState.data.role === role)
            {
                 $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            }
            else
            {
                $http.defaults.headers.common.Authorization = ' ';
            }
          }
        }
      });
})
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider)
    {
        $stateProvider
        
        .state('home',{
            url:"/",
            templateUrl:"views/home.html",
            controller:"HomeCtrl",
            data: {
                ensureAuthenticated: true,
                
            }
            
        })
        .state('login',{
            url:"/login",
            templateUrl: "views/Login/login.html",
            controller:"LoginCtrl"
        })
        .state('employee',{
            url: "/Employee",
            templateUrl:"views/employeeCrud.html",
            data: {
                ensureAuthenticated: true,
            }
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
            controller: "DepartmentCtrl",
            data: {
                ensureAuthenticated: true,
                role: 'Admin'
            }
        })
		.state('project',{
            url: "/Project",
            templateUrl:"views/Projects/ProjectHome.html",
            data: {
                ensureAuthenticated: true,
                role: 'Team Leads'
            }
        })
        .state('project.current',{
            url: "/CurrentProject",
            templateUrl:"views/Projects/currentProjects.html",
            controller :"projectCtrl",
            data: {
                ensureAuthenticated: true,
                role: 'Team Leads'
            }
        })
        .state('project.scrap',{
            url: "/GetScrap",
            templateUrl:"views/Projects/scrapProjects.html",
            controller :"scrapCtrl",
            data: {
                ensureAuthenticated: true,
                role: 'Team Leads'
            }
        })

        $urlRouterProvider.otherwise('/login');
        
    }

])

})();
