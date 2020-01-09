angular.module("clientCtrlModule", ['ClientService', 'ProjectService'])
    .controller("clientCtrl", ["$scope", "listClientService", "$log", "projectService",
        function ($scope, listClientService, $log, projectService) {

            loadRecords();

            function loadRecords() {
                var pGet = listClientService.getClients();
                pGet.then(function (pl) { $scope.clients = pl.data },

                    function (errorPl) {
                        $log.error('failed to load clients', errorPl);
                    }
                )
            }

            $scope.addNewClient = function () {
                $scope.titleHeader = "Add Client";
                $scope.addClientModal = !$scope.addClientModal;
                $scope.insertClient = {};

                $scope.saveData = function () {
                    var Client = {
                        clientFirstName: $scope.insertClient.ClientName,
                        clientOffice: $scope.insertClient.ClientOffice,
                        officeAddress: $scope.insertClient.ClientOAddress,
                        clientContactNumber: $scope.insertClient.ClientContactNumber
                    }
                    var addClient = listClientService.postClient(Client);
                    addClient.then(function () {
                        alert("Data save Successfully");
                        loadRecords();
                        $scope.addClientModal = false;
                    },
                        function (error) {
                            alert("Error: " + error);
                            $scope.addClientModal = false;
                        });
                }

            }

            $scope.editClient = function (c) {
                $scope.edit = [];
                $scope.titleHeader = "Edit Client Details";
                $scope.editClientModal = !$scope.editClientModal;
                $scope.edit.ClientID = c.clientID;
                $scope.edit.ClientName = c.clientFirstName;
                $scope.edit.ClientOffice = c.clientOffice;
                $scope.edit.ClientOAddress = c.officeAddress;
                $scope.edit.ClientContactNumber = c.clientContactNumber;

                $scope.updateClient = function () {
                    var Client = {
                        clientID: $scope.edit.ClientID,
                        clientFirstName: $scope.edit.ClientName,
                        clientLastName: c.clientLastName,
                        clientOffice: $scope.edit.ClientOffice,
                        officeAddress: $scope.edit.ClientOAddress,
                        clientContactNumber: $scope.edit.ClientContactNumber
                    }
                    var updateClient = listClientService.updateClient(Client.clientID, Client);
                    updateClient.then(function () {
                        alert("Data updated Successfully");
                        loadRecords();

                        $scope.editClientModal = false;

                    },
                        function (error) {
                            alert("Error: " + error);
                            $scope.editClientModal = false;
                        });
                }
            }

            $scope.delete = function (cid) {
                $scope.deleteClientModal = !$scope.deleteClientModal;
                $scope.titleHeader = "Are you sure you want to delete this?";
                $scope.CID = cid;
            }

            $scope.deleteClient = function () {

                var deleteClient = listClientService.deleteClient($scope.CID);
                deleteClient.then(function (response) {
                    if (response.data != "") {
                        alert("Data Delete Successfully");
                        $scope.deleteClientModal = false;
                        loadRecords();
                    }
                    else {
                        alert("Something wrong when adding Deleting client ");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                    $scope.deleteClientModal = false;
                });
            }
            $scope.addProject = function (CID) {
                $scope.assignProjectToClient = !$scope.assignProjectToClient;
                $scope.titleHeader = "AddProject";
                $scope.assignProject = {};
                $scope.assignProject.projects = [];
                var pGet = projectService.getProject();
                pGet.then(function (pl) { $scope.project = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });

                $scope.assignProject.onAddProject = function () {
                    var updateClientProject = {
                        clientID: CID,
                        projectID: $scope.assignProject.projects
                    }
                    var updateProject = listClientService.assignProject(updateClientProject);
                    updateProject.then(function () {
                        alert("Assigned Project");
                        loadRecords();
                        $scope.assignProjectToClient = false;
                    }, function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                        $scope.assignProjectToClient = false;
                    })
                }
            }
        }
    ])
    .controller("setClientCtrl", ["$scope", "setClientService", "$log",
        function ($scope, setClientService, $log) {

            loadRecords();

            function loadRecords() {
                var pGet = setClientService.getClientProject();
                pGet.then(function (pl) { $scope.clients = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }

            $scope.editClient = function (c) {
                $scope.edit = [];
                $scope.titleHeader = "Edit Client Details";
                $scope.editClientModal = !$scope.editClientModal;
                $scope.edit.ClientProjectID = c.clientProjectID;
                $scope.edit.ClientID = c.clientID;
                $scope.edit.ClientName = c.clientFirstName;
                $scope.edit.ProjectName = c.projectName;
                $scope.edit.ProjectDescription = c.projectDescription;
                $scope.edit.Status = c.isActive;

                $scope.updateClient = function () {
                    var Client = {
                        clientProjectID: $scope.edit.ClientProjectID,
                        clientID: $scope.edit.ClientID,
                        clientFirstName: $scope.edit.ClientName,
                        projectName: $scope.edit.ProjectName,
                        projectDescription: $scope.edit.ProjectDescription,
                        isActive: $scope.edit.Status,


                    }
                    var updateClient = setClientService.updateClientProject(Client.clientID, Client);
                    updateClient.then(function () {
                        alert("Data updated Successfully");
                        loadRecords();
                        $scope.editClientModal = false;

                    },
                        function (error) {
                            alert("Error: " + error);
                            $scope.editClientModal = false;
                        });
                }
            }
            $scope.delete = function (cid) {
                $scope.deleteClientModal = !$scope.deleteClientModal;
                $scope.titleHeader = "Are you sure you want to delete this?";
                $scope.CID = cid;
            }

            $scope.deleteClient = function () {
                var deleteClient = setClientService.deleteClientProject($scope.CID);
                deleteClient.then(function (response) {
                    if (response.data != "") {
                        alert("Data Delete Successfully");
                        $scope.deleteClientModal = false;
                        loadRecords();
                    }
                    else {
                        alert("Something wrong when adding Deleting client ");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                    $scope.deleteClientModal = false;
                });
            }

        }])