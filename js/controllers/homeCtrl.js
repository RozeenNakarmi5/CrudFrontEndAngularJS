angular.module("homeCtrlModule", ['employeeService', 'ProjectService', 'ClientService', 'angularUtils.directives.dirPagination'])
    .controller("HomeCtrl", ["$scope", "currentEmployeeService", "projectService", "listClientService", "$log",
        function ($scope, currentEmployeeService, projectService, listClientService, $log) {
            countEmployees();
            countProjects();
            countClients();
            GetWorkTime();
            function countEmployees() {
                var promiseGet = currentEmployeeService.countEmployees();
                promiseGet.then(function (pl) { $scope.EmployeesCount = pl.data },
                    function (errorPl) {
                        $log.error('failure loading Employee', errorPl);
                    });
            }

            function countProjects() {
                var promiseGet = projectService.countProject();
                promiseGet.then(function (pl) { $scope.ProjectCount = pl.data },
                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            function countClients() {
                var promiseGet = listClientService.countClients();
                promiseGet.then(function (pl) { $scope.ClientCount = pl.data },
                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            function GetWorkTime(){
                var promiseGet = currentEmployeeService.getWorkTime();
                promiseGet.then(function (pl) { $scope.EmployeeSch = pl.data },
                    function (errorPl) {
                        $log.error('failure loading WorkTime', errorPl);
                    });
            }
            


        }])
