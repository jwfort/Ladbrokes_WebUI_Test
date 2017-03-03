<?php
// API for Ladbrokes Betting App
function get_next_race($id)
{
  $app_info = array();
  // Pull next race from database
  // Hardcode until database exists
  // Send information pertinent to main page
  $race_info = array("Race_Code" => "Br6", "time_to_start" => "07:00"); 
  return $race_info;
}

function get_race_information($id)
{
	// Get race from DB using $id
	// Send information pertinent to specific page, contestant details etc.

	// Lets create some JSON data here for testing purposes


	$contestant_array = array(array("competitor" => "abc", "position" => "1"), array("competitor" => "def", "position" => 2), array("competitor" => "ghi", "position" => "3"));
	$race_info = array("contestants" => $contestant_array); 
	return $race_info;

}

function get_races()
{
  // Return upcoming (5) races to display on main page
  // Hardcode until we have a real db
  $race_list = array(array("Race" => array("meeting" => "BNE", "raceNo" => "1", "raceID" => "1"), "startTime" => "10:15", "type" => "Thoroughbread"), 
  	array("Race" => array("meeting" => "SYD", "raceNo" => "1", "raceID" => "2"), "startTime" => "10:35", "type" => "Greyhound"),
	array("Race" => array("meeting" => "BNE", "raceNo" => "2", "raceID" => "3"), "startTime" => "10:55", "type" => "Harness"),
	array("Race" => array("meeting" => "MEL", "raceNo" => "1", "raceID" => "4"), "startTime" => "11:15", "type" => "Harness"),
	array("Race" => array("meeting" => "BNE", "raceNo" => "3", "raceID" => "5"), "startTime" => "11:35", "type" => "Greyhound"),
	array("Race" => array("meeting" => "SYD", "raceNo" => "2", "raceID" => "6"), "startTime" => "12:05", "type" => "Thoroughbread"));;
  return $race_list;
}

function get_race($id) {
	$race_list_full = array(array("Race" => array("meeting" => "BNE", "raceNo" => "1", "raceID" => "1"), "startTime" => "10:15", "type" => "Thoroughbread"), 
  	array("Race" => array("meeting" => "SYD", "raceNo" => "1", "raceID" => "2"), "startTime" => "10:35", "type" => "Greyhound"),
	array("Race" => array("meeting" => "BNE", "raceNo" => "2", "raceID" => "3"), "startTime" => "10:55", "type" => "Harness"),
	array("Race" => array("meeting" => "MEL", "raceNo" => "1", "raceID" => "4"), "startTime" => "11:15", "type" => "Harness"),
	array("Race" => array("meeting" => "BNE", "raceNo" => "3", "raceID" => "5"), "startTime" => "11:35", "type" => "Greyhound"),
	array("Race" => array("meeting" => "SYD", "raceNo" => "2", "raceID" => "6"), "startTime" => "12:05", "type" => "Thoroughbread"));

	foreach ($race_list_full as $race) {
		foreach ($race as $raceID) { 
			if ($raceID["Race"]["raceID"] == $id) {
				return $race_list_full["Race"];
			}
		};
	};
} 

$possible_url = array("get_race_information", "get_races");

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{
  switch ($_GET["action"])
    {
      case "get_race_information":
      	if (isset($_GET["id"]))
        	$value = get_race_information($_GET["id"]);
        else
        	$value = "Missing argument";
        break;
      case "get_race":
      	if (isset($_GET["id"]))
        	$value = get_race($_GET["id"]);
        else
        	$value = "Missing argument";
        break;

      case "get_races":
          $value = get_races();
        break;
    }
}

//return JSON array
exit(json_encode($value));
?>