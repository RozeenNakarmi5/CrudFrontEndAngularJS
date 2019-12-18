angular.module("homeCtrlModule", ['employeeService'])
.controller("HomeCtrl",["$scope","currentEmployeeService","$log", function($scope,currentEmployeeService,$log){
    countEmployees();
    function countEmployees(){
        var promiseGet = currentEmployeeService.countEmployees();
        promiseGet.then(function (pl){$scope.EmployeesCount = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }
    
    }])