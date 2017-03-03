'use strict';

// Declare app level module which depends on views, and components
angular.module('UpcomingRacesApp', [
	'ngRoute',  
	'UpcomingRacesApp.controllers',
	'UpcomingRacesApp.services'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/raceList", {templateUrl: "racelist/raceList.html", controller: "raceListController"}).
		when("/raceList/:id", {templateUrl: "races/race.html", controller: "raceController"}).
		otherwise({redirectTo: '/raceList'});
}]);
