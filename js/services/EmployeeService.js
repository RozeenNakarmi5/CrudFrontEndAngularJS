angular.module('employeeService', [])
.service ('currentEmployeeService', function($http)
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
    this.updateRoles = function (empID, roleID)
    {
        return $http.put(apiUrl + "UpdateRole/" + empID,roleID)
    }
    this.updateDepartments = function(empID, departmentInfo)
    {
        return $http.put(apiUrl + "UpdateDepartment/" + empID,departmentInfo)
    }
    this.assignProject = function(departmentInfo)
    {
        return $http.put(apiUrl + "AssignProjectToEmployee" + departmentInfo)
    }
    this.getProject = function ()
    {
        return $http.put("http://localhost:8812/api/employee/")
    }
    this.editContact = function (empID, contactData)
    {
        return $http.put("http://localhost:8812/api/employee/updatecontact/" + empID, contactData)
    }
    
})
.service ('pastEmployeeService', function($http)
{
    var apiUrl = "http://localhost:8812/api/employee/";
    this.getPastEmployees = function()
    {
        return $http.get(apiUrl + "/GetNotWorkingEmployee");
    }
    this.addUsers = function(id,loginData)
    {
        return $http.put(apiUrl + "AddUsers/" + id,loginData)
    }
})

