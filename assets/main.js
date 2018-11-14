// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDOR8iog9sW68qavqnhEDkj5HrM_bR4_vE",
  authDomain: "pharmacydelivery-1ff2b.firebaseapp.com",
  databaseURL: "https://pharmacydelivery-1ff2b.firebaseio.com",
  projectId: "pharmacydelivery-1ff2b",
  storageBucket: "pharmacydelivery-1ff2b.appspot.com",
  messagingSenderId: "666352922440"
};
firebase.initializeApp(config);

var database = firebase.database();
var originLongLat = {};

// 2. Button for adding Employees
$("#add-order-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  var deliveryAddress = $("#delivery-address").val().trim();

  var deliveryCity =  $("#city").val().trim();
  var deliveryState = $("#state").val().trim();
  var deliveryZip  = $("#zip-code").val().trim();
  var perscriptionNumber = $("#perscription-number").val().trim();

 
  // Creates local "temporary" object for holding employee data
  var newEntry = {
    name: name,
    deliveryAddress: deliveryAddress,
    perscriptionNumber: perscriptionNumber,
  };

  database.ref("/data").push(newEntry);
  //alert("Entry successfully added");
  $("#name").val("");
  $("#deliveryAddress").val("");
  $("#perscriptionNumber").val("");

  var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + deliveryAddress + ",+" + deliveryCity + ",+" + deliveryState + "&key=AIzaSyCUfu2Dg7gUf6OwezymCUo-QmxOC47Bh2k";

$.ajax({
  url: queryURLGeo,
  method: "GET"
})
  // After the data comes back from the API
  .then(function(response) {
    // console.log(response);

    // Dago - use resutls for ETA 
    var resultsGeoLat = response.results[0].geometry.location.lat;
    var resultsGeoLong = response.results[0].geometry.location.lng;
    originLongLat.lat = resultsGeoLat;
    originLongLat.lng = resultsGeoLong;
   
    console.log(originLongLat,originLongLat.lng);
    console.log("Number 2");
    fourSquareCall();
}); 

 //Foursquare API
 function fourSquareCall() {
      var jqueryFS = "https://api.foursquare.com/v2/venues/search?client_id=CPMQWA3FSBQ05XME3HFVCNFU0Q2H5IQJFNSTV0M54UZMAKGG&client_secret=P3DFOZPMDTHVLJU5TFJLBRUKL4ZTVNZBW1GYRV3JK4GGBZFM&ll=" + originLongLat.lat + "," + originLongLat.lng + "1&query=Pharmacy&limit=1&v=20181113";

      $.ajax({
        url: jqueryFS,
        method: "GET"
      }).then(function(responseFS) {
        // console.log(responseFS);
      
          // lat output
          var resultsFSLat = responseFS.response.venues[0].location.labeledLatLngs[0].lat;
        // long output
          var resultsFSLong = responseFS.response.venues[0].location.labeledLatLngs[0].lng;
        
         
          console.log(resultsFSLat);
          console.log(resultsFSLong);

      
      // fs response needs to land in  var origin = {lat, long} to be called by the google api
        
        
      }); 
    }
});

database.ref("/data").on("child_added", function(childSnapshot) {
  var name = childSnapshot.val().name;
  var deliveryAddress = childSnapshot.val().deliveryAddress;
  var perscriptionNumber = childSnapshot.val().perscriptionNumber;

  

 

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(deliveryAddress),
    $("<td>").text(perscriptionNumber),
  );
  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
<<<<<<< HEAD
var button = `<button id="pebutton" class="btn btn-primary float-right" data-text-swap="enroute">processing</button>`

$(document).on("click","#pebutton", function() {
  var el = $(this);
  console.log(this);
  console.log(el.text());

  if(el.text() === "processing"){
    el.text("enroute");
  } else if(el.text() === "enroute"){
    el.text("delivered")
  } else if("delivered"){
    el.text("processing");
  }

  // update firebase
});

  //Foursquare API
  var jqueryFS = "https://api.foursquare.com/v2/venues/search?client_id=CPMQWA3FSBQ05XME3HFVCNFU0Q2H5IQJFNSTV0M54UZMAKGG&client_secret=P3DFOZPMDTHVLJU5TFJLBRUKL4ZTVNZBW1GYRV3JK4GGBZFM&near=Austin,TX&query=Pharmacy&limit=1&v=20181113";
=======

$("#status-btn").on("click", function(event) {
  event.preventDefault();
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  var hours = today.getHours();
  var minutes = today.getMinutes();
>>>>>>> da616214e433bb6a8f4213b24249571b20343827
  
  var eta = hours + ":" + parseInt(today.getMinutes() + 10);

  var el = $(this);
  $("#time").text(time);



$("#eta").text(eta);
 
  if(el.text() === "Processing"){
    el.text("Enroute");
    $("#status").text("Enroute");
  } else if(el.text() === "Enroute"){
    el.text("Delivered");
    $("#status").text("Delivered");
  } else if("Delivered"){
    el.text("Processing");
    $("#status").text("Processing");
  }
 
  // update firebase
 });

 
  


// api call, needs to take in the FS api output in the query bellow
function googleApiCall () {
      var queryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992&destinations=San+Francisco|Victoria+BC&key=AIzaSyCpuqPaRoQb2Nsuxqyb6ZQtG9uiZdQiRYQ";
      //origins=41.43206,-81.38992|-33.86748,151.20699
      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // console.log(response);

          // Dago - use resutls for ETA 
          var results = response.rows[0].elements[1].duration.text;
          console.log(results);

      //your code goes here.
        
        
      }); 
    };
