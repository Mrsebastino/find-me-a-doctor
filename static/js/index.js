let map, infoWindow, service;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 	56.116600, lng: -3.936900},
    zoom: 12,
  });


  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Your location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          const marker = new google.maps.Marker({
              position: pos,
              map: map,
  });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());

        }
      );

    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

     infowindow = new google.maps.InfoWindow({map:map});
            let service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: 5000,
                type: ['doctor, surgery']
            }, callback);

},

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

  )}
function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

        function createMarker(place) {
            let placeLoc = place.geometry.location;
            let marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(place.name);
                infoWindow.open(map, this);
            });
        }
