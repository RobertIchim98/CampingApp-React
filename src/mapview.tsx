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
  IonText,
} from "@ionic/react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import campimg from "./assets/img/campimg.jpeg";
import {
  useCurrentLocation,
  getSpots,
  getWeather,
  getPosition,
} from "./actions/spots";
import { Toast } from "./toast";

const MapView = ({ isAuthenticated, load_user }) => {
  const [name, setName] = React.useState([]);
  const [spots, setSpots] = React.useState([]);
  const [weather, setWeather] = React.useState<any | null>(null);
  const [location, setLocation] = React.useState<any | null>(null);

  //const location = useCurrentLocation();

  React.useEffect(() => {
    load_user().then((data) => setName(data));
    getSpots().then((data) => setSpots(data));

    getPosition().then((position: any) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        latitude,
        longitude,
      });
      getWeather(position.coords.latitude, position.coords.longitude).then(
        (weather) => {
          setWeather(weather);
          console.log(weather);
        }
      );
      setInterval(() => {
        getWeather(position.coords.latitude, position.coords.longitude).then(
          (weather) => {
            setWeather(weather);
            console.log("10 min Weather: " + weather);
          }
        );
      }, 600000);
    });
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar></IonToolbar>

        <IonSearchbar color="primary" animated={true}></IonSearchbar>
        <IonCard>
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
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "60vw" }}
            />
          )}
        </IonCard>
        <IonCard>
          {weather ? (
            <IonText class="ion-text-center" color="dark">
              <h5>
                {weather.weather[0].description} <br />
                {(weather.main.temp - 273.15).toFixed()}
                {"°C"}
              </h5>
            </IonText>
          ) : (
            <IonText class="ion-text-center" color="dark">
              <h5>..Loading Weather</h5>
            </IonText>
          )}
        </IonCard>
        <IonSlides pager={true} options={{ pagination: true }}>
          {spots.map((spot) => {
            return (
              <IonSlide key={spot.id}>
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
