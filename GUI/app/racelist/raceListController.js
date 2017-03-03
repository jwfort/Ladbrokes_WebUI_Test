angular.module('UpcomingRacesApp.controllers', []).
/* RaceList Controller -> Used for main view*/
controller('raceListController', function($scope, myRESTAPIservice) {
    $scope.raceList = [];

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
    console.log(response);
    $scope.competitors = response.contestants;
  });
  myRESTAPIservice.getRace().success(function (data) {
    console.log(data);
    $scope.race = data;
  });
});