angular.module("homeCtrlModule", ['employeeService'])
.controller("HomeCtrl",["$scope","crudService","$log", function($scope,crudService,$log){
    countEmployees();
    function countEmployees(){
        var promiseGet = crudService.countEmployees();
        promiseGet.then(function (pl){$scope.EmployeesCount = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }
    
    }])