angular.module('ClientService', [])
.service ('listClientService', function($http){
    var apiURL = "http://localhost:8812/api/client/";
    this.getClients = function()
    {
        return $http.get(apiURL);
    }
    this.postClient = function (clientData)
    {
        return $http.post(apiURL,clientData);
    }
    this.deleteClient = function (CID)
    {
        return $http.delete(apiURL + CID);
    }
    this.updateClient = function (CID,clientData)
    {
        return $http.put(apiURL + CID,clientData)
    }
    this.countClients = function (){
        return $http.get(apiURL + "ClientCount");
    }
})

.service ('setClientService', function($http){
    var apiURL = "http://localhost:8812/api/client/setClient/";
    this.getClientProject = function()
    {
        return $http.get(apiURL);
    }
    this.postClientProject = function (clientProjectData)
    {
        return $http.post(apiURL,clientProjectData);
    }
    this.deleteClientProject = function (CPID)
    {
        return $http.delete(apiURL + CPID);
    }
    this.updateClientProject = function (CPID, clientProjectData)
    {
        return $http.put(apiURL + CPID, clientProjectData)
    }
})