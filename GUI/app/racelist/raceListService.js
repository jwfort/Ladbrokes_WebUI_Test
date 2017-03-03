angular.module('UpcomingRacesApp.services', []).
  factory('myRESTAPIservice', function($http) {

    var myRESTAPI = {};

    myRESTAPI.getRaces = function() {
      return $http({
        method: 'GET', 
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_races'
      });
    },

    myRESTAPI.getRaceInfo = function(raceID) {
      return $http({
        method: 'GET',
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_race_information',
        params: {id: raceID}
      })
    },

    myRESTAPI.getRace = function(raceID) {
      return $http({
        method: 'GET',
        url: 'http://localhost/Ladbrokes_WebUI_Test/api.php?action=get_race',
        params: {id: raceID}
      })      
    }

    return myRESTAPI;
  });