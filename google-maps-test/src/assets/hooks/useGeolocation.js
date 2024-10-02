// Importing useEffect and useState hooks from React
import { useEffect, useState } from "react";

// Defining a custom hook named useGeolocation
export default function useGeolocation() {
  // Initializing state to store coordinates with default values as null
  const [coordinates, setCoordinates] = useState({
    latitude: 53.237888,
    longitude: -1.42528,
  });

  // Using useEffect to run the geolocation logic once the component mounts
  useEffect(() => {
    // Checking if the browser supports geolocation
    if (navigator.geolocation) {
      // If supported, get the current position
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // If not supported, log a message and set default coordinates
      console.log("Geolocation not supported - using default location");
      setCoordinates({ latitude: 53.237888, longitude: -1.42528 });
    }

    // Success callback function for geolocation
    function success(position) {
      // Extracting latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Logging the coordinates
      console.log("Successfully retrieved location");
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // Updating the state with the retrieved coordinates
      setCoordinates({ latitude, longitude });
    }

    // Error callback function for geolocation
    function error() {
      // Logging an error message and setting default coordinates
      console.log("Unable to retrieve your location - using default location");
      const latitude = 53.237888;
      const longitude = -1.42528;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // Updating the state with the default coordinates
      setCoordinates({ latitude, longitude });
    }
  }, []); // Empty dependency array ensures this runs only once

  // Returning the coordinates from the hook
  return coordinates;
}
