import { useState, useEffect } from "react";
import MapSearch from "./MapSearch";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export default function Map() {
  // declare state variables
  const [searchLocation, setSearchLocation] = useState(
    "Gill Lane, Grassmoor, Chesterfield, Derbyshire, UK, S42 5AN"
  );
  const [input, setInput] = useState("");
  // prop functions to handle input form
  const handleChange = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchLocation(input);
  };

  const props = {
    searchLocation,
    setSearchLocation,
    input,
    setInput,
    handleChange,
    handleSubmit,
  };
  // create user input form, state to handle changes, and submit
  // pass these as props to MapSearch, which will render the form and handle the input
  // this will be then be used as a callback function in Map component

  // declare state variable for current location
  // want to get user's current location, and set this as default search location

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
      const initialSearchLocation = new google.maps.LatLng(53.19572, -1.39662);
      const map = new google.maps.Map(document.getElementById("map"), {
        center: initialSearchLocation,
        zoom: 16,
      });

      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);

      const request = {
        query: searchLocation,
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
    console.log("Updated search location:", searchLocation);
    loadGoogleMaps();
  }, [searchLocation]);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <MapSearch {...props} />
      <div id="map" style={{ height: "80%", width: "80%" }}></div>
    </div>
  );
}
