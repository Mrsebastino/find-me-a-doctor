let map;
let service;
let infowindow;
let pos;
let request;
let place;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  getLocation();
  // getNearByPlaces();
  // callback();
}

function getLocation() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
     // console.log("getLocation:" + pos.lat + "," + pos.lng);
      let marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
      })
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      infoWindow.open(map);
      map.setCenter(pos);
      getNearByPlaces(pos);
    }, function() {
      console.log("calling handleLocationError(true)");
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("calling handleLocationError(false)")
    handleLocationError(false, infoWindow, map.getCenter());
  }

  infowindow = new google.maps.InfoWindow();
}

function getNearByPlaces(pos) {
 // console.log("getNearByPlaces:" + pos.lat + "," + pos.lng);
  request = {
    location: pos,
    radius: '5000',
    query: 'doctor'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("callback received " + results.length + " results");
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < results.length; i++) {
      console.log(JSON.stringify(results[i]));
      place = results[i];
      let mark = createMarker(results[i]);
      bounds.extend(mark.getPosition());
    }
    map.fitBounds(bounds);
  } else console.log("callback.status=" + status);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
  });

  google.maps.event.addListener(marker, 'click', function() {
    let bookingForm = `<div>${place.name}</div><form action="bookAppointment"><label for="fname">Name:</label><input type="text" id="fname" name="fname"><br>` + `<label for="email">Email address:</label><input type="email" id="email" name="email"></form><br>` + `<div class="btn-book btn-primary" type="submit">Book Appointment</div>` 
    infowindow.setContent(bookingForm);
    infowindow.open(map, this);
  });
  return marker;
}
