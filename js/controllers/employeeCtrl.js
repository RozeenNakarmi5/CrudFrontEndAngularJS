angular.module("employeeCtrlModule", ['employeeService','ProjectService'])
.controller("EmployeeCtrl",["$scope","currentEmployeeService","$log","projectService",
 function($scope, currentEmployeeService, $log, projectService){
    $scope.btnText = "Save";
    $scope.employeeId = 0;
    $scope.showModal = false;
    $scope.addDepartmentModal = false;
    $scope.addNewEmployee= false;
    $scope.editEmployee=false;
    $scope.assignProjectToEmployee = false;

    loadRecords ();
    function loadRecords (){
        var promiseGet = currentEmployeeService.getEmployees();
        promiseGet.then(function (pl){$scope.Employees = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }

    $scope.populateForm = function(empData){
        $scope.updateEmployee = {};
        $scope.titleHeader = "Update Employee";
        $scope.btnText = "Update";
        $scope.editEmployee= !$scope.editEmployee;
        $scope.updateEmployee.employeeID = empData.employeeID ;
        $scope.updateEmployee.isFullTimer = empData.isFullTimer;
        $scope.updateEmployee.salary = empData.salary;
        $scope.updateEmployee.designation = empData.designation;
        $scope.updateEmployee.updateEmployeeData = function() {
            var employee = {
                employeeID : $scope.updateEmployee.employeeID,
                designation : $scope.updateEmployee.designation,
                salary : $scope.updateEmployee.salary,
                isFullTimer : $scope.updateEmployee.isFullTimer
            };
            var updateEmployee = currentEmployeeService.updateEmployees(employee.employeeID,employee);
            updateEmployee.then(function (){

                alert("Data Updated Successfully");
                loadRecords ();
                $scope.editEmployee= false;

            },function(error){
                console.log("Error: "+ error)
            });
        }

    }
    $scope.btnAddNewEmployee = function()
    {
        $scope.insertEmployee = {};
        $scope.titleHeader = "Add Employee";
        $scope.addNewEmployee= !$scope.addNewEmployee;
        $scope.insertEmployee.saveEmployeeData = function()
        {
            var employees = {
                firstName :  $scope.insertEmployee.firstName,
                lastName :  $scope.insertEmployee.lastName,
                address : $scope.insertEmployee.address,
                email :  $scope.insertEmployee.email,
                contactNumber: $scope.insertEmployee.contactNumber,
                emergencyContactNumber: $scope.insertEmployee.emergencyContactNumber,
                profilePicture : $scope.insertEmployee.profilePicture,
                designation: $scope.insertEmployee.designation,
                salary: $scope.insertEmployee.salary,
                isFullTimer: $scope.insertEmployee.isFullTimer,
                userName : $scope.insertEmployee.userName,
                password : $scope.insertEmployee.password,
                roleID : $scope.insertEmployee.roleID,
                departmentID: $scope.insertEmployee.departmentID
            }
            var addEmployees = currentEmployeeService.postEmployees(employees);
            addEmployees.then(function() {
                    alert("Data save Successfully");
                    loadRecords ();
            },function(error){
                console.log("Error: "+ error)
            });
        }

    }

    $scope.onDelete = function(employeeID){
        var deletedEmployee = currentEmployeeService.deleteEmployees(employeeID);
        deletedEmployee.then(function (response)
        {
            if(response.data != "")
            {
                alert("Data Delete Successfully");
                loadRecords ();
            }
            else
            {
                alert("Something wrong when adding Deleting employee ");

            }
        }, function (error){
            console.log("Error: " + error);
        });
 
    }


    $scope.onUpdateRole = function(empdID)
    {
        $scope.updatingRoles= {};
        $scope.titleHeader = "Add Roles";
        $scope.updatingRoles.roleID= "";
        $scope.showModal = !$scope.showModal;
        $scope.saveUpdatedRolesRecord = function ()
        {
            var updatedEmployees = {
                employeeID : empdID,
                roleID : $scope.updatingRoles.roleID
            }
            var updateRoles = currentEmployeeService.updateRoles(empdID, updatedEmployees);
            updateRoles.then(function(){
                alert("Updated role successfully");
                loadRecords ();
                $scope.showModal = false;
            });
        }
    }
    $scope.onUpdateDepartment = function(empID)
    {
        $scope.updatingDepartment= {};
        $scope.titleHeader = "Update Department";
        $scope.updatingDepartment.departmentID="";
        $scope.addDepartmentModal = !$scope.addDepartmentModal;
        $scope.saveUpdatedDepartmentRecord = function ()
        {
            var updateEmployeesDepartment = {
                employeeID : empID,
                departmentID : $scope.updatingDepartment.departmentID
            }
            var updateDepartment = currentEmployeeService.updateDepartments(empID,updateEmployeesDepartment);
            updateDepartment.then(function(){
                alert("Updated department successfully");
                loadRecords ();
                $scope.addDepartmentModal = false;
            });
        }
    }
    $scope.addProject = function(empID)
    {
        $scope.assignProjectToEmployee = !$scope.assignProjectToEmployee;
        $scope.titleHeader = "AddProject";
        $scope.assignProject = {};
        $scope.assignProject.asdf = [];
        var pGet = projectService.getProject();
        pGet.then(function (pl) { $scope.project = pl.data },

        function (errorPl) {
            $log.error('failure loading Project', errorPl);
        });
        $scope.assignProject.onAddProject = function()
        {
            var updateEmployeeProject = {
                employeeID : empID,
                projectID : $scope.assignProject.asdf
            }
            var updateProject = currentEmployeeService.assignProject(updateEmployeeProject);
            updateProject.then(function(){
                alert("Assigned Project");
                loadRecords ();
                $scope.assignProjectToEmployee = false;
            })
        }
    }
    
}])


//Not working employee controller
.controller("NotWorkingEmployeeCtrl",["$scope","pastEmployeeService","$log",'$uibModal',
function ($scope,pastEmployeeService,$log, $uibModal){
    $scope.userNamex='';
    $scope.titleHeader = "Add Users";
    loadRecords ();
    
    function loadRecords (){
        var promiseGet = pastEmployeeService.getPastEmployees();
        promiseGet.then(function (pl){$scope.Employees = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        },function(error){
            console.log("Error: "+ error);
        });
    }

    $scope.showModal = false;
    $scope.addUsers = function(employeeID)
    {
        $scope.mainArr= {};
        $scope.mainArr.userNamex = "";
        $scope.mainArr.passwordx ="";
        $scope.mainArr.rolex = "";
        $scope.showModal = !$scope.showModal;
        $scope.saveUserData = function(){
            var users = {
                employeeID : employeeID,
                userName : $scope.mainArr.userNamex,
                password : $scope.mainArr.passwordx,
                roleID : $scope.mainArr.rolex
            }
            
            var userAdd = pastEmployeeService.addUsers(employeeID,users);
            userAdd.then(function() {
                alert("Data save Successfully");
                loadRecords ();
                $scope.showModal = false;
            },function(error){
                console.log("Error: "+ error)
            });
            $scope.mainArr = {};
            
        }
    }

   
}])
