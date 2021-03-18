import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonImg,
  IonPage,
  IonSearchbar,
  IonSlides,
  IonSlide,
  IonToolbar,
  IonSkeletonText,
} from "@ionic/react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import campimg from "./assets/img/campimg.jpeg";
import { useCurrentLocation, getSpots, getWeather } from "./actions/spots";

const MapView = ({ isAuthenticated, load_user }) => {
  const [name, setName] = React.useState([]);
  const [spots, setSpots] = React.useState([]);
  const [weather, setWeather] = React.useState<any | null>(null);

  const location = useCurrentLocation();

  navigator.geolocation.getCurrentPosition((spotlocation) => {
    getWeather(
      spotlocation.coords.latitude,
      spotlocation.coords.longitude
    ).then((data) => setWeather(data));
  });

  React.useEffect(() => {
    load_user().then((data) => setName(data));
    getSpots().then((data) => setSpots(data));
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar></IonToolbar>
        <IonSearchbar color="primary" animated={true}></IonSearchbar>
        {location ? (
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={6}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>You are here</Popup>
            </Marker>
            {spots.map((spot) => {
              return (
                <Marker position={spot.lat_lon} key={spot.id}>
                  <Popup>{spot.title}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <IonSkeletonText animated style={{ width: "100%", height: "60vw" }} />
        )}
        {weather ? (
          <p>
            {weather["name"]}: {weather.weather[0].description}
          </p>
        ) : (
          <p>..Loading Weather</p>
        )}
        <IonSlides pager={true} options={{ pagination: true }}>
          {spots.map((spot) => {
            return (
              <IonSlide>
                <IonCard class="ion-text-center" style={{ height: "100vw" }}>
                  <IonImg src={campimg} style={{ height: "50vw" }} />
                  <IonCardTitle>{spot.title}</IonCardTitle>
                  <IonCardContent>
                    <p>{spot.description}</p>
                    <p>by {spot.owner}</p>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
            );
          })}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  MapView
);
