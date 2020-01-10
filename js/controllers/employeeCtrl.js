angular.module("employeeCtrlModule", ['employeeService', 'ProjectService', 'departmentService'])
    .controller("EmployeeCtrl", ["$scope", "currentEmployeeService", "$log", "projectService", "departService",
        function ($scope, currentEmployeeService, $log, projectService, departService) {
            $scope.btnText = "Save";
            $scope.employeeId = 0;
            $scope.showModal = false;
            $scope.addDepartmentModal = false;
            $scope.addNewEmployee = false;
            $scope.editEmployee = false;
            $scope.assignProjectToEmployee = false;
            $scope.editContacts = false;
            $scope.empScheduleModal = false;

            loadRecords();
            loadDepartments();
            function loadDepartments() {
                var pGet = departService.getDepartments();
                pGet.then(function (pl) { $scope.departments = pl.data },
                    function (errorPl) {
                        $log.error('failure loading department', errorPl);
                    });
            }
            function loadRecords(pageNumber) {
                var pGet = currentEmployeeService.getEmployees(pageNumber);
                pGet.then(function (pl) {
                    $scope.Employees = pl.data;
                },

                    function (errorPl) {
                        $log.error('failed to load Employee', errorPl);
                    }
                )
            }
            function loadSchedule(pageNumber) {
                var scheGet = currentEmployeeService.getEmpSchedule(pageNumber);
                scheGet.then(function (pl) {
                    $scope.EmpSchedules = pl.data;
                },
                    function (error) {
                        $log.error('failed to load Employee Schedule', error);
                    })
            }

            $scope.populateForm = function (empData) {
                $scope.updateEmployee = {};
                $scope.titleHeader = "Update Employee";
                $scope.btnText = "Update";
                $scope.editEmployee = !$scope.editEmployee;
                $scope.updateEmployee.employeeID = empData.employeeID;
                $scope.updateEmployee.isFullTimer = empData.isFullTimer;
                $scope.updateEmployee.salary = empData.salary;
                $scope.updateEmployee.designation = empData.designation;
                $scope.updateEmployee.updateEmployeeData = function () {
                    var employee = {
                        employeeID: $scope.updateEmployee.employeeID,
                        designation: $scope.updateEmployee.designation,
                        salary: $scope.updateEmployee.salary,
                        isFullTimer: $scope.updateEmployee.isFullTimer
                    };
                    var updateEmployee = currentEmployeeService.updateEmployees(employee.employeeID, employee);
                    updateEmployee.then(function () {

                        alert("Data Updated Successfully");
                        loadRecords();
                        $scope.editEmployee = false;

                    }, function (error) {
                        console.log("Error: " + error);
                        $scope.editEmployee = false;
                    });
                }

            }
            $scope.editContactx = function (empID) {
                $scope.editContact = {};
                $scope.titleHeader = "Edit Contact Information";
                $scope.editContacts = !$scope.editContacts;
                $scope.editContact.contactID = empID.contactID;
                $scope.editContact.firstName = empID.firstName;
                $scope.editContact.lastName = empID.lastName;
                $scope.editContact.address = empID.address;
                $scope.editContact.eMail = empID.email;
                $scope.editContact.contactNumber = empID.contactNumber
                $scope.editContact.eContactNumber = empID.emergencyContactNumber;
                $scope.editContact.profilePicture = empID.profilePicture

                $scope.saveEditedContact = function () {
                    var editedContact = {
                        contactID: $scope.editContact.contactID,
                        firstName: $scope.editContact.firstName,
                        lastName: $scope.editContact.lastName,
                        address: $scope.editContact.address,
                        email: $scope.editContact.eMail,
                        contactNumber: $scope.editContact.contactNumber,
                        emergencyContactNumber: $scope.editContact.eContactNumber,
                        profilePicture: $scope.editContact.profilePicture
                    }
                    var editContact = currentEmployeeService.editContact(editedContact.contactID, editedContact);
                    editContact.then(function () {
                        alert("Updated contact information successfully");
                        loadRecords();
                        $scope.editContacts = false;

                    }, function (error) {
                        console.log("Error: " + error);
                        $scope.editContacts = false;
                    });
                }
            }
            $scope.btnAddNewEmployee = function () {
                $scope.titleHeader = "Add Employee";
                $scope.addNewEmployee = !$scope.addNewEmployee;

                $scope.insertEmployee = {};
                $scope.insertEmployee.saveEmployeeData = function () {
                    var employees = {
                        firstName: $scope.insertEmployee.firstName,
                        lastName: $scope.insertEmployee.lastName,
                        address: $scope.insertEmployee.address,
                        email: $scope.insertEmployee.email,
                        contactNumber: $scope.insertEmployee.contactNumber,
                        emergencyContactNumber: $scope.insertEmployee.emergencyContactNumber,
                        profilePicture: $scope.insertEmployee.imageSrc,
                        designation: $scope.insertEmployee.designation,
                        salary: $scope.insertEmployee.salary,
                        isFullTimer: $scope.insertEmployee.isFullTimer,
                        userName: $scope.insertEmployee.userName,
                        password: $scope.insertEmployee.password,
                        roleID: $scope.insertEmployee.roleID,
                        departmentID: $scope.insertEmployee.departmentID
                    }
                    var addEmployees = currentEmployeeService.postEmployees(employees);
                    addEmployees.then(function () {
                        if ($scope.insertEmployee.firstName === undefined && $scope.insertEmployee.lastName === undefined && $scope.insertEmployee.address === undefined
                            && $scope.insertEmployee.email === undefined && $scope.insertEmployee.contactNumber === undefined && $scope.insertEmployee.emergencyContactNumber === undefined
                            && $scope.insertEmployee.imageSrc === undefined && $scope.insertEmployee.designation === undefined && $scope.insertEmployee.salary === undefined && $scope.insertEmployee.isFullTimer === undefined
                            && $scope.insertEmployee.userName === undefined && $scope.insertEmployee.password === undefined && $scope.insertEmployee.roleID === undefined
                            && $scope.insertEmployee.departmentID === undefined) {
                            alert("Please dont leave the field blank");
                        }
                        else {
                            alert("Data save Successfully");
                            loadRecords();
                            $scope.addNewEmployee = false;
                        }
                    }, function (error) {
                        $scope.addNewEmployee = false;
                        console.log("Error: " + error)
                    });
                }
            }
            $scope.onDelete = function (employeeID) {
                if (confirm('Are you sure you want to delete?')) {
                    var deletedEmployee = currentEmployeeService.deleteEmployees(employeeID);
                    deletedEmployee.then(function (response) {
                        if (response.data != "") {
                            alert("Data Delete Successfully");
                            loadRecords();
                        }
                        else {
                            alert("Something wrong when adding Deleting employee ");

                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });

                }

            }
            $scope.onUpdateRole = function (empdID) {
                $scope.updatingRoles = {};
                $scope.titleHeader = "Add Roles";
                $scope.updatingRoles.roleID = "";
                $scope.showModal = !$scope.showModal;
                $scope.saveUpdatedRolesRecord = function () {
                    var updatedEmployees = {
                        employeeID: empdID,
                        roleID: $scope.updatingRoles.roleID
                    }
                    var updateRoles = currentEmployeeService.updateRoles(empdID, updatedEmployees);
                    updateRoles.then(function () {
                        alert("Updated role successfully");
                        loadRecords();
                        $scope.showModal = false;
                    }, function (error) {
                        console.log("Error: " + error);
                        $scope.showModal = false;

                    });
                }
            }
            $scope.addProject = function (empID) {
                $scope.assignProjectToEmployee = !$scope.assignProjectToEmployee;
                $scope.titleHeader = "AddProject";
                $scope.assignProject = {};
                $scope.assignProject.asdf = [];
                var pGet = projectService.getProject();
                pGet.then(function (pl) { $scope.project = pl.data },
                    function (errorPl) {
                        $log.error('failure loading Project', errorPl);
                    });
                $scope.assignProject.onAddProject = function () {
                    var updateEmployeeProject = {
                        employeeID: empID,
                        projectID: $scope.assignProject.asdf
                    }
                    var updateProject = currentEmployeeService.assignProject(updateEmployeeProject);
                    updateProject.then(function () {
                        alert("Assigned Project");
                        loadRecords();
                        $scope.assignProjectToEmployee = false;
                    }, function (error) {
                        console.log("Error: " + error);
                        $scope.assignProjectToEmployee = false;

                    });
                }
            }
            $scope.onUpdateDepartment = function (empID) {
                $scope.updatingDepartment = {};
                $scope.titleHeader = "Update Department";
                $scope.updatingDepartment.departmentID = "";
                $scope.addDepartmentModal = !$scope.addDepartmentModal;
                $scope.saveUpdatedDepartmentRecord = function () {
                    var updateEmployeesDepartment = {
                        employeeID: empID,
                        departmentID: $scope.updatingDepartment.departmentID
                    }
                    var updateDepartment = currentEmployeeService.updateDepartments(empID, updateEmployeesDepartment);
                    updateDepartment.then(function () {
                        alert("Updated department successfully");
                        loadRecords();
                        $scope.addDepartmentModal = false;
                    }, function (error) {
                        console.log("Error: " + error);
                        $scope.addDepartmentModal = false;
                    });
                }
            }

            //pagination from codepen.io .... code from here copied and modified
            $scope.currentPage = 0;
            $scope.sCurrentPage = 0;
            $scope.pageSize = 5;
            currentEmployeeService.countEmployees().then(function (pl) { $scope.EmployeesCount = pl.data });
            currentEmployeeService.countEmpSchedule().then(function (pl) { $scope.eSC = pl.data });


            $scope.numberOfPages = function () {
                return Math.ceil($scope.EmployeesCount / 5);
            }
            $scope.numberofSchedulePage = function () {
                return Math.ceil($scope.eSC / 5);
            }


            $scope.change = function (a) {

                $scope.currentPage = $scope.currentPage + a;

                console.log($scope.currentPage);

                // return loadRecords($scope.currentPage+1);
                var pGet = currentEmployeeService.getEmployees($scope.currentPage + 1);
                pGet.then(function (pl) {
                    $scope.Employees = pl.data;
                },

                    function (errorPl) {
                        $log.error('failed to load employees', errorPl);
                    }
                )
            }

            $scope.changeSchedule = function (a) {
                $scope.countEmpSchedules = currentEmployeeService.countEmpSchedule();

                $scope.sCurrentPage = $scope.sCurrentPage + a;

                console.log($scope.sCurrentPage);

                // return loadRecords($scope.currentPage+1);
                var pGet = currentEmployeeService.getEmpSchedule($scope.sCurrentPage + 1);
                pGet.then(function (pl) {
                    $scope.EmpSchedules = pl.data;
                },

                    function (errorPl) {
                        $log.error('failed to load clients', errorPl);
                    }
                )
            }
            // $scope.previous = function(){
            //     $scope.currentPage=$scope.currentPage-1
            //     return loadRecords($scope.currentPage);
            // }
            $scope.btnEmpSchedule = function () {
                $scope.empScheduleModal = !$scope.empScheduleModal;
                $scope.titleHeader = "Employee Schedule";
                loadSchedule();

                $scope.export = function () {
                    if (confirm('Are you sure you want to export?')) {
                        var exportData = currentEmployeeService.exportEmpSchedule();
                        exportData.then(function () {
                            alert("Export Success Full");
                        });
                    }

                }
            }


        }])

    // .filter('startFrom', function () {
    //     return function (input, start) {
    //         start = +start; //parse to int
    //         return input.slice(start);
    //     }
    // })

    //Not working employee controller
    .controller("NotWorkingEmployeeCtrl", ["$scope", "pastEmployeeService", "$log", '$uibModal',
        function ($scope, pastEmployeeService, $log, $uibModal) {
            $scope.userNamex = '';
            $scope.titleHeader = "Add Users";
            loadRecords();

            function loadRecords() {
                var promiseGet = pastEmployeeService.getPastEmployees();
                promiseGet.then(function (pl) { $scope.Employees = pl.data },
                    function (errorPl) {
                        $log.error('failure loading Employee', errorPl);
                    }, function (error) {
                        console.log("Error: " + error);
                    });
            }

            $scope.showModal = false;
            $scope.addUsers = function (employeeID) {
                $scope.mainArr = {};
                $scope.mainArr.userNamex = "";
                $scope.mainArr.passwordx = "";
                $scope.mainArr.rolex = "";
                $scope.showModal = !$scope.showModal;
                $scope.saveUserData = function () {
                    var users = {
                        employeeID: employeeID,
                        userName: $scope.mainArr.userNamex,
                        password: $scope.mainArr.passwordx,
                        roleID: $scope.mainArr.rolex
                    }

                    var userAdd = pastEmployeeService.addUsers(employeeID, users);
                    userAdd.then(function () {
                        alert("Data save Successfully");
                        loadRecords();
                        $scope.showModal = false;
                    }, function (error) {
                        console.log("Error: " + error)
                    });
                    $scope.mainArr = {};

                }
            }
        }])

