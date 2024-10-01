import { useEffect } from "react";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export default function Map() {
  useEffect(() => {
    // Function to dynamically load the Google Maps Script

    const loadGoogleMaps = (callback) => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("Script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) callback();
        };
      } else {
        if (callback) callback();
      }
    };

    // initialize the map after the script is loaded
    window.initMap = function () {
      const sydney = new google.maps.LatLng(-33.867, 151.195);
      const map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
      });

      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);

      const request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            createMarker(place, map, infowindow);
          });
          map.setCenter(results[0].geometry.location);
        }
      });
    };
    // function to create a marker
    function createMarker(place, map, infowindow) {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map, marker);
      });
    }

    loadGoogleMaps();
  }, []);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div id="map" style={{ height: "80%", width: "80%" }}></div>
    </div>
  );
}
