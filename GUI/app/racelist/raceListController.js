angular.module('UpcomingRacesApp.controllers', ['timer']).
/* RaceList Controller -> Used for main view*/
controller('raceListController', function($scope, myRESTAPIservice) {
    $scope.raceList = [];

    $scope.timerRunning = true;

    $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };

    $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

    myRESTAPIservice.getRaces().success(function (data) {
      $scope.raceList = data;
    });
}).

/* Race Controller -> Used to display race specific information*/
controller('raceController', function($scope, $routeParams, myRESTAPIservice) {
  $scope.id = $routeParams.id;
  $scope.race = null;
  $scope.competitors = [];


  myRESTAPIservice.getRaceInfo($scope.id).success(function (response) {
    $scope.competitors = response.contestants;
  });
  myRESTAPIservice.getRaces().success(function (data) {
    console.log(data);
    $scope.race = data;
  });
});