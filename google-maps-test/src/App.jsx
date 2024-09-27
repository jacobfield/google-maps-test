import { useEffect } from "react";

function App() {
  // Fetch API key using Vite's environment variable system
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Dynamically create and load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;
    script.onload = () => {
      initMap(); // Initialize map once script is loaded
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Clean up script on component unmount
    };
  }, [apiKey]); // Ensure the effect re-runs if the API key changes

  let map;

  // Function to initialize the map
  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: 53.196695, lng: -1.392604 },
      zoom: 15,
    });
  }

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div id="map" style={{ height: "80%", width: "80%" }}></div>
    </div>
  );
}

export default App;
