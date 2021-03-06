angular.module('employeeService', [])
.service ('currentEmployeeService', function($http)
{
    var apiUrl = "http://localhost:8812/api/employee/";
    this.getEmployees = function(pageNumber)
    {
        return $http.get(apiUrl + "?pageNumber=" + pageNumber);
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
    this.assignProject = function(projectInfo)
    {
        return $http.post(apiUrl + "AssignProjectToEmployee",projectInfo)
    }
  
    this.editContact = function (empID, contactData)
    {
        return $http.put("http://localhost:8812/api/employee/updatecontact/" + empID, contactData)
    }
    this.getEmpSchedule = function(pageNumber)
    {
        return $http.get(apiUrl+ "GetEmpSchedule?pageNumber=" + pageNumber)
    }
    this.countEmpSchedule = function()
    {
        return $http.get(apiUrl + "/CountEmpSchedule");
    }
    this.exportEmpSchedule = function()
    {
        return $http.post(apiUrl + "/ExportEmpSchedule")
    }
    this.employeeProject = function(pageNumber)
    {
        return $http.get(apiUrl + "/EmpProject?pageNumber=" + pageNumber);
    }
    this.countEmpPrj = function()
    {
        return $http.get(apiUrl + "/CountEmpPrj");
    }
    this.deleteProject = function(empProjectID)
    {
        return $http.delete(apiUrl + "/DeleteProject/" + empProjectID)
    }
	this.getWorkTime = function () {
	        return $http.get(apiUrl + "GetWorkTime")
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
          
