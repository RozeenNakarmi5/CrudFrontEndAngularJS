angular.module("clientCtrlModule", ['ClientService'])
    .controller("clientCtrl", ["$scope", "listClientService", "$log",
        function ($scope, listClientService, $log) {

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
                        $scope.addClientModal = !$scope.addClientModal;
                    },
                        function (error) {
                            alert("Error: " + error);
                            $scope.addClientModal = !$scope.addClientModal;
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
                        
                        $scope.editClientModal = !$scope.editClientModal;

                    },
                        function (error) {
                            alert("Error: " + error);
                        });
                }
            }

            $scope.delete = function (cid){
                $scope.deleteClientModal = !$scope.deleteClientModal;
                $scope.titleHeader = "Are you sure you want to delete this?";
                $scope.CID = cid;
            }

            $scope.deleteClient = function (){
                
                var deleteClient = listClientService.deleteClient($scope.CID);
                deleteClient.then(function (response) {
                    if (response.data != "") {
                        alert("Data Delete Successfully");
                        $scope.deleteClientModal = !$scope.deleteClientModal;
                        loadRecords();
                        

                    }
                    else {
                        alert("Something wrong when adding Deleting client ");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }
    ])
    .controller("setClientCtrl", ["$scope", "setClientService", "$log",
        function ($scope, setClientService, $log) {

            loadRecords();

            function loadRecords() {
                var pGet = setClientService.getClientProject();
                pGet.then(function (pl) { $scope.p = pl.data },

                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
            }
        }])