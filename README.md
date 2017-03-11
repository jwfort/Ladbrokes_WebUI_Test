Jake Fortescue

This is an app developed as the technical test for a position at Ladbrokes
 in Brisbane, Australia.
 
 The App uses a PHP backend interfacing with an AngularJS frontend.

 In order to run this website functionally, you must host the api.php on a local server, such that:
 
 	http://localhost/Ladbrokes_WebUI_Test/api.php 
  
 resolves to the correct file location. Note all paths used are relative to the git directory structure, so running this 
 server directly after cloning, presuming you run the Frontend from the correct location, should be sufficient.

 Running the front-end of this application required navigating to the GUI folder of the git repository and running:
 ```
 npm start
 ```
 Navigate to Localhost and node should take care of the rest

N.B: You *Will* need to enable Cross-Origin-Resource-Sharing, as required based upon how you host the services, but if you follow the instuctions above then you will need it.

 Notes:
 - Need to actually use a database and not just JSON placeholders. I was picking up PHP essentially as I went and ran out of time to implement that side of the API
 
 - This actually impacts back on the API, as it is ... really kind of neccessary to use  database, with the way i went about things, so instead of being sensible, the GUI just loads all of the race data into memory, and takes it from there. This is fine for my sample size but would suffer in large data sets.
 
- Frontend works reasonably well, with a little more time I would:

- Expand the links to cover the entire table entry rather than just the Meeting/Name

- Add more sorting/exception handling

- Some helper functions as there is a little bit of repeated code there.

- And when betting closes on a race page, an alert saying "Betting Closed" rather than a 00:00 timer, though that explains itself in some ways.
