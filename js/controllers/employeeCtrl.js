angular.module("employeeCtrlModule", ['employeeService'])
.controller("EmployeeCtrl",["$scope","crudService","$log","$routeParams",
 function($scope, crudService, $log, $routeParams){
    $scope.btnText = "Save";
    $scope.employeeId = 0;
    loadRecords ();
    clear();
    function loadRecords (){
        var promiseGet = crudService.getEmployees();
        promiseGet.then(function (pl){$scope.Employees = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }
    function clear(){
        $scope.employeeId = 0;
        $scope.name = "";
        $scope.address = "";
        $scope.companyName = "";
        $scope.designation= "";
        
    }
    $scope.populateForm = function(empData){
        $scope.employeeId = empData.employeeId ;
        $scope.name = empData.name;
        $scope.address = empData.address ;
        $scope.companyName = empData.companyName;
        $scope.designation = empData.designation;
        $scope.btnText= "Update";
    }
    $scope.saveData = function()
    {
        var employee = {
            employeeId : $scope.employeeId,
            name :  $scope.name,
            address : $scope.address,
            companyName: $scope.companyName,
            designation : $scope.designation
        }
        if ($scope.btnText == "Save")
        {
            var addEmployees = crudService.postEmployees(employee);
            addEmployees.then(function (response){
                if (response.data != "")
                {
                    alert("Data save Successfully");
                    loadRecords ();
                    clear();
                }
                else
                {
                    alert("Unable to save");
                }

            },function(error){
                console.log("Error: "+ error)
            });
        }
        if ($scope.btnText == "Update")
        {
            var updateEmployee = crudService.updateEmployees(employee.employeeId,employee);
            updateEmployee.then(function (){
                
                alert("Data Updated Successfully");
                loadRecords ();
                clear();

            },function(error){
                console.log("Error: "+ error)
            });
        }
    }
    
    $scope.onDelete = function(employeeID){
        var deletedEmployee = crudService.deleteEmployees(employeeID);
        deletedEmployee.then(function (response)
        {
            if(response.data != "")
            {
                alert("Data Delete Successfully");
                loadRecords ();
                clear();

            }
            else
            {
                alert("Something wrong when adding Deleting employee ");

            }
        }, function (error){
            console.log("Error: " + error);
        });
       
    }
}])