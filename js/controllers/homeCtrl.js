angular.module("homeCtrlModule", ['employeeService','ProjectService'])
.controller("HomeCtrl",["$scope","currentEmployeeService","projectService","$log", 
function($scope,currentEmployeeService,projectService, $log){
    countEmployees(); 
    countProjects();

    function countEmployees(){
        var promiseGet = currentEmployeeService.countEmployees();
        promiseGet.then(function (pl){$scope.EmployeesCount = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }

    function countProjects(){
        var promiseGet = projectService.countProject();
        promiseGet.then(function (pl){$scope.ProjectCount = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Project', errorPl);
        });
    }
    
    
    }])