angular.module("departmentCtrlModule", ['departmentService'])
.controller("DepartmentCtrl",["$scope","departService","$log", 
function ($scope,departService,$log)
{
    $scope.addDepartment = false;
    $scope.updateDepartment = false;
    $scope.btnText = "Save";
    loadRecords();
    function loadRecords (){
        var promiseGet = departService.getDepartments();
        promiseGet.then(function (pl){$scope.Departments = pl.data},
        function (errorPl)
        {
            $log.error('failure loading Department', errorPl);
        });
    }
    $scope.btnAddNewDepartment = function ()
    {
        $scope.titleHeader = "Add Department";
        $scope.addDepartment = !$scope.addDepartment;
        $scope.addDepartmentInfo = {};
        $scope.addDepartmentInfo.saveDepartmentData = function ()
        {
            var department = {
                departmentName : $scope.addDepartmentInfo.departmentName
            }
            var savingDepartment = departService.postDepartment(department);
            savingDepartment.then(function (){
                alert("Data Saved Successfully");
                loadRecords ();
                $scope.addDepartment= false;

            },function(error){
                console.log("Error: "+ error)
            });
        }
    }
    $scope.onDelete = function (deptID)
    {
        if (confirm('Are you sure you want to delete?')) {
        var deleteDepartment = departService.deleteDepartment(deptID);
        deleteDepartment.then(function (response)
        {
            if(response.data != "")
            {
                alert("Data Delete Successfully");
                loadRecords ();
            }
            else
            {
                alert("Something wrong when adding Deleting Department ");

            }
        }, function (error){
            console.log("Error: " + error);
        });
        } else {
            loadRecords ();
        }
        
    }
    $scope.populateForm = function(deptData){
        
        $scope.updateDepartmentInfo = {};
        $scope.titleHeader = "Update Department";
        $scope.btnText = "Update";
        $scope.updateDepartment= !$scope.updateDepartment;
        $scope.updateDepartmentInfo.departmentID = deptData.departmentID ;
        $scope.updateDepartmentInfo.departmentName = deptData.departmentName;
        $scope.updateDepartmentInfo.updateDepartmentData = function() {
            var department = {
                departmentID : $scope.updateDepartmentInfo.departmentID,
                departmentName : $scope.updateDepartmentInfo.departmentName,
            };
            var updateDepartment = departService.updateDepartment(department.departmentID,department);
            updateDepartment.then(function (){

                alert("Data Updated Successfully");
                loadRecords ();
                $scope.updateDepartment= false;

            },function(error){
                console.log("Error: "+ error)
            });
        }

    }
}])

