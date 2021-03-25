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
export const addSpot = async (title, description, owner, spotlocation) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    owner,
    title,
    description,
    location:
      "SRID=4326;POINT ( " +
      spotlocation.coords.longitude +
      " " +
      spotlocation.coords.latitude +
      ")",
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/spot/`,
      body,
      config
    );
    return res;
  } catch (err) {
    console.log("Location error" + err);
  }
};

/*
Leaflet part
*/
// obtain current user location
export const useCurrentLocation = (options = geolocationOptions) => {
  // store error message in state
  const [error, setError] = React.useState<any | null>(null);
  const [location, setLocation] = React.useState<any | null>(null);

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
  };
  const handleError = (error) => {
    setError(error.message);
    Toast("Something went wrong!", "warning");
  };
  return location;
};

//geolocation options for leaflet map
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

// Get Weather
export const getWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"53f424fdc9808492a1f4622478cc19b3"}`
    );
    if (response.status === 200) {
      return await response.json();
    }
    return response.statusText;
  } catch (err) {
    Toast("Could not fetch Weather", "warning");
  }
};

export const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
