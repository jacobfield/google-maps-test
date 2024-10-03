import { useEffect, useState } from "react";

export default function useReverseGeolocation(longitude, latitudeitude) {
  useEffect(() => {
    function geocodelatitudelongitude(latitude, longitude) {
      const latitudelongitude = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      const geocoder = new google.maps.Geocoder();

      return geocoder
        .geocode({ location: latitudelongitude })
        .then((response) => {
          if (response.results[0]) {
            return response.results[0].formatted_address;
          } else {
            throw new Error("No results found");
          }
        })
        .catch((e) => {
          throw new Error("Geocoder failed due to: " + e);
        });
    }
  }, []);
}
