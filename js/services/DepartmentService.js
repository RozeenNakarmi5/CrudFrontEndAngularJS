angular.module('departmentService', [])
.service ('departService', function($http){
    var apiURL = "http://localhost:8812/api/department/";
    this.getDepartments = function()
    {
        return $http.get(apiURL);
    }
    this.postDepartment = function (departmentData)
    {
        return $http.post(apiURL,departmentData);
    }
    this.deleteDepartment = function (deptID)
    {
        return $http.delete(apiURL + deptID);
    }
    this.updateDepartment = function (deptID,departmentData)
    {
        return $http.put(apiURL + deptID,departmentData)
    }
})
