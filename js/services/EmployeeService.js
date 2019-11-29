angular.module('employeeService', [])
.service ('crudService', function($http)
{
    var apiUrl = "http://localhost:8812/api/employee/";
    this.getEmployees = function()
    {
        return $http.get(apiUrl);
    }
    this.countEmployees = function()
    {
        return $http.get(apiUrl + "/EmployeeCount");
    }
    this.deleteEmployees = function (id)
    {
        return $http.delete(apiUrl + id);
    }
    this.postEmployees = function (employeeData)
    {
        return $http.post(apiUrl, employeeData)
    }
    this.updateEmployees = function (empID, employeeData)
    {
        return $http.put(apiUrl + empID,employeeData)
    }
});

