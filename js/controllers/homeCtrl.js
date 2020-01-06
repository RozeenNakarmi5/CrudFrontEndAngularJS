angular.module("homeCtrlModule", ['employeeService', 'ProjectService', 'LoginService', 'ClientService', 'angularUtils.directives.dirPagination'])
    .controller("HomeCtrl", ["$scope", "currentEmployeeService", "projectService", "listClientService", "$log", "loginServ",
        function ($scope, currentEmployeeService, projectService, listClientService, $log, loginServ) {
            countEmployees();
            countProjects();
            countClients();
            $scope.isLoggedIn = false;
            const token = localStorage.getItem('token');
            if (token) {
                loginServ.ensureAuthenticated(token)
                    .then((user) => {
                        if (user.data.status === 'success');
                        $scope.isLoggedIn = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
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


        }])
