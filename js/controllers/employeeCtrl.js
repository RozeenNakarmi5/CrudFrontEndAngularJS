angular.module("employeeCtrlModule", ['employeeService'])
.controller("EmployeeCtrl",["$scope","currentEmployeeService","$log",
 function($scope, currentEmployeeService, $log){
    $scope.btnText = "Save";
    $scope.employeeId = 0;
    $scope.showModal = false;
    $scope.addDepartmentModal = false;

    loadRecords ();

    clear();
    function loadRecords (){
        var promiseGet = currentEmployeeService.getEmployees();
        promiseGet.then(function (pl){$scope.Employees = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Employee', errorPl);
        });
    }

    
    function clear(){
        $scope.employeeID = 0;
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.address = "";
        $scope.email= "";
        $scope.contactNumber = "";
        $scope.emergencyContactNumber = "";
        $scope.profilePicture = "";
        $scope.designation = "";
        $scope.salary = "";
        $scope.isFullTimer = "";
        $scope.userName = "";
        $scope.password = "";
        $scope.departmentID = "";
    }

    $scope.populateForm = function(empData){
        $scope.titleHeader = "Edit Employee" + empData.firstName;
        $scope.editModal = !$scope.editModal;
        $scope.employeeID = empData.employeeID ;
        // $scope.firstName = empData.firstName;
        // $scope.address = empData.address ;
        $scope.isFullTimer = empData.isFullTimer;
        $scope.salary = empData.salary;
        $scope.designation = empData.designation;
        $scope.btnText= "Update";
    }

    $scope.saveData = function()
    {
        var employee = {
            employeeID : $scope.employeeID,
            firstName :  $scope.firstName,
            lastName :  $scope.lastName,
            address : $scope.address,
            email :  $scope.email,
            contactNumber: $scope.contactNumber,
            emergencyContactNumber: $scope.emergencyContactNumber,
            profilePicture : $scope.profilePicture,
            designation: $scope.designation,
            salary: $scope.salary,
            isFullTimer: $scope.isFullTimer,
            userName : $scope.userName,
            password : $scope.password,
            roleID : $scope.roleID,
            departmentID: $scope.departmentID
        }
        if ($scope.btnText == "Save")
        {
            var addEmployees = currentEmployeeService.postEmployees(employee);
            addEmployees.then(function() {
                    alert("Data save Successfully");
                    loadRecords ();
                    clear();
            },function(error){
                console.log("Error: "+ error)
            });
        }
        if ($scope.btnText == "Update")
        {
            var updateEmployee = currentEmployeeService.updateEmployees(employee.employeeID,employee);
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
        var deletedEmployee = currentEmployeeService.deleteEmployees(employeeID);
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
        $scope.addDepartmentModal = !$scope.addDepartmentModal;
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
// .directive('modal', function () {
//     return {
//       template: '<div class="modal fade">' + 
//           '<div class="modal-dialog">' + 
//             '<div class="modal-content">' + 
//               '<div class="modal-header">' + 
//               '<h4 class="modal-title">{{titleHeader}}</h4>' + 
//                 '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
//               '</div>' + 
//               '<div class="modal-body" ng-transclude></div>' + 
//             '</div>' + 
//           '</div>' + 
//         '</div>',
//       restrict: 'AE',
//       transclude: true,
//       replace:true,
//       scope:true,
//       link: function postLink(scope, element, attrs) {
//           scope.$watch(attrs.visible, function(value){
//           if(value == true)
//             $(element).modal('show');
//           else
//             $(element).modal('hide');
//         });

//         $(element).on('shown.bs.modal', function(){
//           scope.$apply(function(){
//             scope.$parent[attrs.visible] = true;
//           });
//         });

//         $(element).on('hidden.bs.modal', function(){
//           scope.$apply(function(){
//             scope.$parent[attrs.visible] = false;
//           });
//         });
//       }
//     };
//   });