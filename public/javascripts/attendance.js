// jshint esversion:8
var myApp = angular.module('myApp', []);


myApp.controller('namesCtrl', function ($scope, $http) {
    $scope.triggerForm = true;
    $scope.addForm = false;
    $scope.order = 'name';
    $scope.reverse = true;
    $scope.centers = [];
    $scope.courses = [];
    $scope.lectures = [];
    $scope.users = [];
    $scope.chosenCenter = '';
    $scope.chosenCourse = '';
    $scope.chosenLecture = '';
    $('#saveandcancel').hide();
    $('#studenttable').hide();
    $('#lec').hide();
    $('#lblec').hide();
    $http({
        method: 'GET',
        url: '/admin/Centerdata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        $scope.chosenCenter = "";
        for (var i = 0; i < response.data.center_name.length; i++) {
            $scope.centers.push({
                name: response.data.center_name[i],
                id: i
            });
        }

    }, function errorCallback(response) {
        alert(response.statusText);
    });
    $http({
        method: 'GET',
        url: '/admin/Coursedata'
    }).then(function successCallback(response) {
        console.log("API is used successfully");
        $scope.chosenCourse = "";
        for (var i = 0; i < response.data.course_name.length; i++) {
            $scope.courses.push({
                id: response.data.course_id[i],
                name: response.data.course_name[i],
            });
            console.log(response.data.course_id[i] + "   " + response.data.course_name[i]);
        }
    }, function errorCallback(response) {
        alert(response.statusText);
    });

    $scope.orderBy = function (filter) {
        $scope.order = filter;
        $scope.reverse = !$scope.reverse;
    };
    $scope.viewlecattend = function () {
        if($scope.chosenCourse != '' && $scope.chosenCenter != '' && $scope.chosenLecture != ''){
            $scope.triggerForm = true;
            $scope.addForm = true;
            $('#view').hide();
            $('#lbcourse').hide();
            $('#Course').hide();
            $('#lbcenter').hide();
            $('#selectcenter').hide();
            $('#lblec').hide();
            $('#lec').hide();
            $('#saveandcancel').show();
            $http({
                method: 'GET',
                url: '/assistant/studentInfoCourse/' + $scope.chosenCourse ,
            }).then(function successCallback(response) {
                console.log("API is used successfully");
                console.log(response);
                for(var i = 0; i < response.data.assistIds.length; i++){
                    $scope.users.push({
                        assistid: response.data.assistIds[i],
                        name: response.data.fullnames[i],
                        phone: response.data.phones[i],
                        parent_phone: response.data.parent_phones[i],
                        code: response.data.studCodes[i],
                        password: response.data.studpasswords[i],
                        blackpoints: response.data.blackpoints[i],
                        school: response.data.schools[i],
                        attend: false,
                        lec_num: -1,
                        center_name: '',
                        course_id: -1


                    });
                }
            }, function errorCallback(response) {
                alert(response.statusText);
            });
                $('#studenttable').show();
        }
    };
    $scope.showLec = function () {        
        $http({
            method: 'GET',
            url: '/assistant/lecturenumber/' + $scope.chosenCourse
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.lecture_num.length; i++) {
                $scope.lectures.push({
                    id: response.data.lecture_num[i],
                    day: response.data.day[i],
                    hour: response.data.hour[i]
                });
                $('#lec').append(`<option value="${response.data.lecture_num[i]}"> 
                                       ${"Lecture Number: " + response.data.lecture_num[i] + " Day: " + response.data.day[i] + " Time: " + response.data.hour[i]} 
                                  </option>`); 
            }
        }, function errorCallback(response) {
            alert(response.statusText);
        });
        $('#lec').show();
        $('#lblec').show();    
    };
    $scope.savestudentAttendance = function (user){
        console.log(user);
        console.log(user.attend);
        user.attend = ! user.attend;
    };
    $scope.insertAttendance = function (){
        for (let i = 0; i < $scope.users.length; i++) {
            $scope.users[i].lec_num = $scope.chosenLecture;
            $scope.users[i].center_name = $scope.chosenCenter;
            $scope.users[i].course_id = $scope.chosenCourse;
        }
        $http({
            method: 'POST',
            url: '/assistant/setattendance', 
            data: $scope.users
        }).then(function successCallback(response) {
            users.attend = !users.attend; 
        }, function errorCallback(response) {
            alert(response.statusText);
        });
        $(location).attr('href', '/assistant');
    };



    $scope.cancelAttendance = function (){
        $(location).attr('href', '/assistant/attendance');
    };




});