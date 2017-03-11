angular.module('UpcomingRacesApp.apiServices', []).
  factory('RESTAPI', function($http) {

    var RESTAPI = {};

    RESTAPI.getRaces = function() {
      return $http({
        method: 'GET', 
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_races'
      });
    },

    RESTAPI.getRaceInfo = function(raceID) {
      return $http({
        method: 'GET',
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_race_information',
        params: {id: raceID}
      })
    },

    RESTAPI.getRace = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_race'
      });
    }

    return RESTAPI;
  });
angular.module('UpcomingRacesApp.datastorageServices', []).
  factory('dataStorage', function() {
    var dataStorage = {};

    dataStorage.raceData = [],

    dataStorage.setRaceData = function(data) {
      dataStorage.raceData = data;
      return true;
    },

    dataStorage.getRace = function(ind) {
      for (var i=0; i < dataStorage.raceData.length; i++) {
        if (dataStorage.raceData[i]["index"] == ind) {
          return dataStorage.raceData[i];
        }
      }
    },

    dataStorage.getRaces = function() {
      return dataStorage.raceData;
    }

    return dataStorage;
  })