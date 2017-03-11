angular.module('UpcomingRacesApp.controllers', ['timer']).
/* RaceList Controller -> Used for main view*/
controller('raceListController', function($scope, $filter, $compile, RESTAPI, dataStorage) {
    $scope.raceList = [];

    $scope.timerRunning = true;

    // Callback to delete a race, and call get_race, and add returned new race to the bottom of the list. 
    $scope.callbackTimer = {};

    $scope.callbackTimer.raceStarted=function($id){
        $scope.racesToDisplay.splice($id, 1);
        var toRemove = $scope.raceList.shift();
        $scope.racesToDisplay.push($scope.raceList[4]);
        dataStorage.setRaceData($scope.raceList);
        // Update

        // Now that the elements are updated, we need to mold the timer into what we want.
        for (var i=0;i<$scope.racesToDisplay.length;i++) {
          // Grab start time returned by the API
          // Diff with current_time -> return hh:mm:ss to start
          var currDate = new Date();
          var startTime = new Date($scope.racesToDisplay[i].startTime * 1000);
          // Start time from now = diff of hours/mins/seconds
          /*var timetoStart = new Date();*/

          var timetoStart = (startTime.getTime() - currDate.getTime());
          $scope.racesToDisplay[i].startTimeMS = timetoStart/1000;
        }

        $scope.$apply();
        $scope.$broadcast('timer-reset');
        $scope.$broadcast('timer-start');
    };

    if (dataStorage.getRaces().length == 0) { 
      RESTAPI.getRaces().success(function (data) {
        $scope.raceList = data;
        for (var i=0;i<$scope.raceList.length;i++) {
          // Grab start time returned by the API
          // Diff with current_time -> return hh:mm:ss to start
          var currDate = new Date();
          var startTime = new Date($scope.raceList[i].startTime * 1000);
          // Start time from now = diff of hours/mins/seconds
          /*var timetoStart = new Date();*/

          var timetoStart = (startTime.getTime() - currDate.getTime());
          $scope.raceList[i].startTimeMS = timetoStart/1000;
        }
        dataStorage.setRaceData($scope.raceList);
        $scope.racesToDisplay = [];
        for (var i=0; i < 5; i++) {
          $scope.racesToDisplay.push($scope.raceList[i]);
        }
      });
    } 
    else 
    {
      $scope.raceList = dataStorage.getRaces();
      console.log($scope.raceList);
      $scope.racesToDisplay = [];
      for (var i=0; i < 5; i++) {
        $scope.racesToDisplay.push($scope.raceList[i]);
      }
      for (var i=0;i<$scope.racesToDisplay.length;i++) {
        // Grab start time returned by the API
        // Diff with current_time -> return hh:mm:ss to start
        var currDate = new Date();
        var startTime = new Date($scope.racesToDisplay[i].startTime * 1000);
        // Start time from now = diff of hours/mins/seconds
        /*var timetoStart = new Date();*/

        var timetoStart = (startTime.getTime() - currDate.getTime());

        if (timetoStart < 0) {
          $scope.racesToDisplay.splice(i, 1);
          var toRemove = $scope.raceList.shift();
          $scope.racesToDisplay.push($scope.raceList[4]);
          dataStorage.setRaceData($scope.raceList);
          i--;
        } else { 
          $scope.racesToDisplay[i].startTimeMS = timetoStart/1000;
        }
      }
    }
}).

/* Race Controller -> Used to display race specific information*/
controller('raceController', function($scope, $routeParams, RESTAPI, dataStorage) {
  $scope.id = $routeParams.id;
  $scope.race = dataStorage.getRace($scope.id);
  console.log($scope.race);
  $scope.competitors = [];

  RESTAPI.getRaceInfo($scope.id).success(function (data) {
    $scope.competitors = data.contestants;
  });

});