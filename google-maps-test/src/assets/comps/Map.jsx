import { useState, useEffect, useRef } from "react";
import MapSearch from "./MapSearch";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeolocation from "../hooks/useReverseGeolocation";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Map() {
  // Declare state variables
  const [searchLocation, setSearchLocation] = useState("London");
  const [geolocationSuccess, setGeolocationSuccess] = useState(false);
  const [locationName, setLocationName] = useState("");

  const [input, setInput] = useState("");
  const mapRef = useRef(null);
  const serviceRef = useRef(null);
  const infowindowRef = useRef(null);

  // Prop functions to handle input form
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchLocation(input);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const props = {
    searchLocation,
    setSearchLocation,
    input,
    setInput,
    handleChange,
    handleSubmit,
    handleEnter,
  };

  // Using the custom hook to get the current coordinates
  const coordinates = useGeolocation();
  // Destructuring latitude and longitude from the coordinates object
  const { latitude, longitude, success } = coordinates;

  // Declare reverse geo location string at top level (if failure, dummy string)
  const revGeoLocStr = useReverseGeolocation(latitude, longitude, success);

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

      const initialLocation = new google.maps.LatLng(latitude, longitude);
      const map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 16,
        mapId: "DEMO_MAP_ID", // must be added for advanced markers
      });

      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);
      // Store current value instances in ref
      mapRef.current = map;
      serviceRef.current = service;
      infowindowRef.current = infowindow;

      // Call updateMapLocation function
      if (success) {
        updateMapLocation(revGeoLocStr);
        console.log("Geolocation successful");
      } else {
        updateMapLocation(searchLocation);
      }
    };

    loadGoogleMaps();
  }, [latitude, longitude, success, revGeoLocStr, searchLocation]);

  useEffect(() => {
    if (mapRef.current && serviceRef.current) {
      updateMapLocation(searchLocation); // Update map location with searchLocation
    }
    console.log("Updated search location:", searchLocation);
  }, [searchLocation]);

  const updateMapLocation = (location) => {
    const request = {
      query: location,
      fields: ["name", "geometry"],
    };

    serviceRef.current.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          createAdvancedMarker(place, mapRef.current, infowindowRef.current);
        });
        mapRef.current.setCenter(results[0].geometry.location);
      }
    });
  };

  // Function to create an AdvancedMarkerElement
  async function createAdvancedMarker(place, map, infowindow) {
    if (!place.geometry || !place.geometry.location) return;

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

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

  return (
    <>
      <MapSearch {...props} />
      <div id="map" style={{ height: "80%", width: "80%" }}></div>
    </>
  );
}
