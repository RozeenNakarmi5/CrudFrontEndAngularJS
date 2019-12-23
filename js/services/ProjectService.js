angular.module('ProjectService', [])
    .service('projectService', function ($http) {
        var apiUrl = "http://localhost:8812/api/project";
        this.getProject = function () {
            return $http.get(apiUrl);
        }
        this.countProject = function () {
            return $http.get(apiUrl + "/ProjectCount");
        }
        this.postProject = function (projectData) {
            return $http.post(apiUrl, projectData)
        }
        this.updateProject = function (projectID, projectData) {
            return $http.put(apiUrl + "/" + projectID, projectData)
        }
        this.deleteProject = function (projectID) {
            return $http.delete(apiUrl + "/" + projectID);
        }
    })
    .service('scrapProjectService', function ($http) {
        var apiUrl = "http://localhost:8812/api/project/GetScrap";
        this.getScrap = function () {
            return $http.get(apiUrl);
        }
        this.restoreProject = function (projectID) {
            return $http.put(apiUrl + "/" + projectID);
        }
    })


