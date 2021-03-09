import {
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonItemSliding,
  IonPage,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import axios from "axios";
import { Toast } from "./toast";
import backpack from "./assets/img/backpack.png";

const getSpots = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios({
    url: `${process.env.REACT_APP_API_URL}/spot/`,
    method: "get",
  }).then((response) => {
    return response.data;
  });
};
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const useCurrentLocation = (options = {}) => {
  // store error message in state
  const [error, setError] = React.useState<any | null>(null);
  const [location, setLocation] = React.useState<any | null>(null);

  React.useEffect(() => {
    // If the geolocation is not defined in the used browser you can handle it as an error
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
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
  };
  return { location, error };
};

const MapView = ({ isAuthenticated, load_user }) => {
  const [name, setName] = React.useState([]);
  const [spots, setSpots] = React.useState([]);

  React.useEffect(() => {
    load_user().then((data) => setName(data));
    getSpots().then((data) => setSpots(data));
  }, []);
  console.log(spots);
  const { location, error } = useCurrentLocation(geolocationOptions);
  console.log(location);

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      {location ? (
        <IonContent>
          <IonSearchbar color="primary" animated={true}></IonSearchbar>

          <MapContainer
            style={{ height: "100vw" }}
            center={[location.latitude, location.longitude]}
            zoom={6}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            {spots.map((spot) => {
              return (
                <Marker position={spot.lat_lon}>
                  <Popup>Title:{spot.title}</Popup>
                </Marker>
              );
            })}
          </MapContainer>

          <h1>Hello {name["first_name"]}!</h1>
        </IonContent>
      ) : (
        <IonContent>
          <IonHeader class="ion-text-center">
            <h1>..Loading Location</h1>
          </IonHeader>
          <IonImg src={backpack} />
        </IonContent>
      )}
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  MapView
);
