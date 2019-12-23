angular.module("projectCtrlModule", ['ProjectService'])
    .controller("projectCtrl", ["$scope", "projectService", "$log",
        function ($scope, projectService, $log) {
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

            $scope.addNewProject = function () {

                $scope.titleHeader = "Add Project";
                $scope.addProjectModal = !$scope.addProjectModal;

                $scope.saveData = function () {
                    var project = {
                        
                        projectName: $scope.projectName,
                        projectDescription: $scope.projectDescription,
                        projectStartDate: $scope.projectStartDate,
                        projectEndDate: $scope.projectEndDate
                        
                        
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

            $scope.edit = [];
            $scope.editProject = function (proj) {

                $scope.titleHeader = "Edit Project Details" + proj.projectName;
                $scope.editProjectModal = !$scope.editProjectModal;
                $scope.edit.projectID = proj.projectID;
                $scope.edit.projectName = proj.projectName;
                $scope.edit.projectDesc = proj.projectDescription;
                $scope.edit.projectSD = proj.projectStartDate;
                $scope.edit.projectED = proj.projectEndDate;
                $scope.edit.projectSts = proj.isActive;
                $scope.updateProject = function () {
                    var project = {
                        projectID: $scope.edit.projectID,
                        projectName: $scope.edit.projectName,
                        projectDescription: $scope.edit.projectDesc,
                        projectStartDate: $scope.edit.projectSD,
                        projectEndDate: $scope.edit.projectED,
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
                pGet.then(function (pl) { $scope.p = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            $scope.restore =[];
            $scope.restore = function(projectID){
                $scope.titleHeader = "Restore?";
                $scope.restoreProjectModal = !$scope.restoreProjectModal;
                $scope.restore.PID = projectID;
            }

            $scope.restoreProject = function (){
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