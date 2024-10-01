import { useState, useEffect } from "react";
import MapSearch from "./MapSearch";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Map() {
  // Declare state variables
  const [searchLocation, setSearchLocation] = useState(
    "Gill Lane, Grassmoor, Chesterfield, Derbyshire, UK, S42 5AN"
  );
  const [input, setInput] = useState("");

  // Prop functions to handle input form
  const handleChange = (e) => {
    setInput(e.target.value);
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

  useEffect(() => {
    // Function to dynamically load the Google Maps Script
    const loadGoogleMaps = (callback) => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async`;
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

    // Initialize the map after the script is loaded
    window.initMap = async function () {
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      const initialSearchLocation = new google.maps.LatLng(53.19572, -1.39662);
      const map = new google.maps.Map(document.getElementById("map"), {
        center: initialSearchLocation,
        zoom: 16,
        mapId: "DEMO_MAP_ID", // You must include a mapId to use AdvancedMarkerElement
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
            createAdvancedMarker(place, map, infowindow);
          });
          map.setCenter(results[0].geometry.location);
        }
      });
    };

    // Function to create an AdvancedMarkerElement
    async function createAdvancedMarker(place, map, infowindow) {
      if (!place.geometry || !place.geometry.location) return;

      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      const marker = new AdvancedMarkerElement({
        map,
        position: place.geometry.location,
        title: place.name || "Location", // Set marker title
      });

      marker.addListener("click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map, marker);
      });
    }

    console.log("Updated search location:", searchLocation);
    loadGoogleMaps();
  }, [searchLocation]);

  return (
    <div
      className="container"
      style={{ height: "100vh", backgroundColor: "gray" }}
    >
      <MapSearch {...props} />
      <div id="map" style={{ height: "80%", width: "80%" }}></div>
    </div>
  );
}
