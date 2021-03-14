import axios from "axios";
import React from "react";
import { Toast } from "../toast";

/* API part */
export const getSpots = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/spot/`,
    method: "get",
  });
  return response.data;
};

//create addSpot

/*
Leaflet part
*/
// obtain current user location
export const useCurrentLocation = (options = geolocationOptions) => {
  // store error message in state
  const [error, setError] = React.useState<any | null>(null);
  const [location, setLocation] = React.useState<any | null>(null);
  const [weather, setWeather] = React.useState<any | null>(null);

  React.useEffect(() => {
    // If the geolocation is not defined in the used browser you can handle it as an error
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      Toast("Location not available!", "warning");
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [options]);

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude,
    });
    getWeather(latitude, longitude).then((data) => setWeather(data));
  };
  const handleError = (error) => {
    setError(error.message);
    Toast("Something went wrong!", "warning");
  };
  console.log(weather);
  return { location, weather };
};

//geolocation options for leaflet map
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

// Get Weather
export const getWeather = async (lat, lon) => {
  const response = await axios({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"53f424fdc9808492a1f4622478cc19b3"}`,
    method: "get",
  });
  return response.data;
};
