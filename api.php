<?php
// API for Ladbrokes Betting App

// Initialise races
class races {
  static public $race_list_full = null;
  static public function init() {
    if (self::$race_list_full == null) {
      // Hardcode until we have a real db 
      // Time baseline
      $curr_time = time(); // we will manipulate/add to this for *each* Race, to stagger our times. 
                       // We are simply assuming that there is never a non-JS application pointing at our API, easy to change if required.
      

      // If I had time and was better with PHP this would not be half as ugly. I could just pull from a database instead of needing a convoluted JSON object
      // But such is life, and I feel like this has come a long way from the PHP I started with/started writing last week.

      self::$race_list_full = array(array("index" => "0", "Race" => array("meeting" => "BNE", "raceNo" => "1", "raceID" => "1"), "startTime" => ($curr_time + (11)), "type" => "Thoroughbread"), 
        array("index" => "1", "Race" => array("meeting" => "SYD", "raceNo" => "1", "raceID" => "2"), "startTime" => ($curr_time + (1 * 21)), "type" => "Greyhound"),
        array("index" => "2", "Race" => array("meeting" => "BNE", "raceNo" => "2", "raceID" => "3"), "startTime" => ($curr_time + (3 *60)), "type" => "Harness"),
        array("index" => "3", "Race" => array("meeting" => "MEL", "raceNo" => "1", "raceID" => "4"), "startTime" => ($curr_time + (5*60)), "type" => "Harness"),
        array("index" => "4", "Race" => array("meeting" => "BNE", "raceNo" => "3", "raceID" => "5"), "startTime" => ($curr_time + (7*60)), "type" => "Greyhound"),
        array("index" => "5", "Race" => array("meeting" => "BNE", "raceNo" => "4", "raceID" => "7"), "startTime" => ($curr_time + (11*60)), "type" => "Thoroughbread"), 
        array("index" => "6", "Race" => array("meeting" => "SYD", "raceNo" => "3", "raceID" => "8"), "startTime" => ($curr_time + (13*60)), "type" => "Greyhound"),
        array("index" => "7", "Race" => array("meeting" => "BNE", "raceNo" => "5", "raceID" => "9"), "startTime" => ($curr_time + (15*60)), "type" => "Harness"),
        array("index" => "8", "Race" => array("meeting" => "MEL", "raceNo" => "2", "raceID" => "10"), "startTime" => ($curr_time + (17*60)), "type" => "Harness"),
        array("index" => "9", "Race" => array("meeting" => "BNE", "raceNo" => "6", "raceID" => "11"), "startTime" => ($curr_time + (19*60)), "type" => "Greyhound"),
        array("index" => "10","Race" => array("meeting" => "SYD", "raceNo" => "4", "raceID" => "12"), "startTime" => ($curr_time + (21*60)), "type" => "Thoroughbread")
        );
      return self::$race_list_full;
    } 
  }
}

function get_race_information($id)
{
  // Get race from DB using $id -- eventually
  // Send information pertinent to specific page, contestant details etc.

  // Due to time this will just stay as a dummy of competitors
  // Ideally a database would map race_PK -> Competitor list, and we would use the id passed here to get said list
  // But for now, this will do, I suppose.
  $contestant_array = array(array("competitor" => "abc", "position" => "1"), array("competitor" => "def", "position" => "2"), array("competitor" => "ghi", "position" => "3"),
    array("competitor" => "jkl", "position" => "4"), array("competitor" => "mno", "position" => "5"), array("competitor" => "pqr", "position" => "6"));
  $race_info = array("contestants" => $contestant_array); 
  return $race_info;

}

function get_races()
{
  // Return initial 5 races 
  races::init();
  return races::$race_list_full;
}

$possible_url = array("get_race_information", "get_races", "get_race");

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
      	$value = get_race();
        break;
      case "get_races":
        $value = get_races();
        break;
    }
}

//return JSON array
exit(json_encode($value));
?>