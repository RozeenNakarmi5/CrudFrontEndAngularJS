angular.module("projectCtrlModule", ['ProjectService'])
    .controller("projectCtrl", ["$scope", "projectService", "$log",
        function ($scope, projectService, $log, $filter) {
            $scope.addProjectModal = false;
            loadRecords();
            clear();

            function loadRecords() {
                var pGet = projectService.getProject();
                pGet.then(function (pl) { $scope.project = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            function clear() {
                $scope.projectID = "";
                $scope.projectName = "";
                $scope.projectDescription = "";
                $scope.projectStartDate = "";
                $scope.projectEndDate = "";
                $scope.isActive = "";
            }

            function date(date) {
                var d = new Date(date);
                var dateString = ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + + d.getFullYear();
                var ok = { date: new Date(dateString) };
                return ok;
            }

            $scope.addNewProject = function () {

                $scope.titleHeader = "Add Project";
                $scope.addProjectModal = !$scope.addProjectModal;
                $scope.insertProject = {};

                $scope.saveData = function () {
                    var project = {

                        projectName: $scope.insertProject.projectName,
                        projectDescription: $scope.insertProject.projectDesc,
                        projectStartDate: $scope.insertProject.projectSD,
                        projectEndDate: $scope.insertProject.projectED,
                        isActive: true


                    }
                    var addProject = projectService.postProject(project);
                    addProject.then(function () {
                        alert("Data save Successfully");
                        loadRecords();
                        clear();
                        $scope.addProjectModal = !$scope.addProjectModal;
                    },
                        function (error) {
                            alert("Error: " + error);
                            $scope.addProjectModal = !$scope.addProjectModal;
                        });
                }
            }


            $scope.editProject = function (proj) {
                $scope.edit = [];
                $scope.titleHeader = "Edit Project Details" + proj.projectName;
                $scope.editProjectModal = !$scope.editProjectModal;
                $scope.edit.projectID = proj.projectID;
                $scope.edit.projectName = proj.projectName;
                $scope.edit.projectDesc = proj.projectDescription;
                $scope.edit.projectSD = date(proj.projectStartDate);
                $scope.edit.projectED = date(proj.projectEndDate);
                console.log($scope.edit.projectSD);
                $scope.edit.projectSts = proj.isActive;
                $scope.updateProject = function () {
                    var project = {
                        projectID: $scope.edit.projectID,
                        projectName: $scope.edit.projectName,
                        projectDescription: $scope.edit.projectDesc,
                        projectStartDate: $scope.edit.projectSD.date,
                        projectEndDate: $scope.edit.projectED.date,
                        isActive: $scope.edit.projectSts
                    }
                    var addProject = projectService.updateProject(project.projectID, project);
                    addProject.then(function () {
                        alert("Data updated Successfully");
                        loadRecords();
                        clear();
                        $scope.editProjectModal = !$scope.editProjectModal;

                    },
                        function (error) {
                            alert("Error: " + error);
                        });
                }
            }
            $scope.delete = {};
            $scope.delete = function (projectID) {
                $scope.titleHeader = "Delete?";
                $scope.deleteProjectModal = !$scope.deleteProjectModal;
                $scope.delete.PID = projectID;
            }

            $scope.deleteProject = function () {
                var deleteProject = projectService.deleteProject($scope.delete.PID);
                deleteProject.then(function (response) {
                    if (response.data != "") {
                        alert("Data Delete Successfully");
                        $scope.deleteProjectModal = !$scope.deleteProjectModal;
                        loadRecords();
                        clear();

                    }
                    else {
                        alert("Something wrong when adding Deleting project ");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }


        }])
    .controller("scrapCtrl", ["$scope", "scrapProjectService", "$log",
        function ($scope, scrapProjectService, $log) {

            loadRecords();

            function loadRecords() {
                var pGet = scrapProjectService.getScrap();
                pGet.then(function (pl) { $scope.projects = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            $scope.restore = [];
            $scope.restore = function (projectID) {
                $scope.titleHeader = "Restore?";
                $scope.restoreProjectModal = !$scope.restoreProjectModal;
                $scope.restore.PID = projectID;
            }

            $scope.restoreProject = function () {
                var restoreProject = scrapProjectService.restoreProject($scope.restore.PID);
                restoreProject.then(function (response) {
                    if (response.data != "") {
                        alert("Data restored Successfully");
                        $scope.restoreProjectModal = !$scope.restoreProjectModal;
                        loadRecords();
                    }
                    else {
                        alert("Something wrong when adding Deleting project ");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }])