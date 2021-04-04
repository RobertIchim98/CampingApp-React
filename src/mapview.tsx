import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonImg,
  IonPage,
  IonSlides,
  IonSlide,
  IonToolbar,
  IonSkeletonText,
  IonText,
  IonModal,
  IonButton,
} from "@ionic/react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./App.css";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import noimg from "./assets/img/noimg.png";
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
  const [showModal, setShowModal] = React.useState(false);

  //const location = useCurrentLocation();

  React.useEffect(() => {
    let unmounted = false;

    load_user().then((data) => setName(data));

    // reverse the array to get the newest spots
    getSpots().then((data) => setSpots(data.reverse()));

    getPosition().then((position: any) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        latitude,
        longitude,
      });
      console.log("new_location:" + location);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  React.useEffect(() => {
    let unmounted = false;

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
    return () => {
      unmounted = true;
    };
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar></IonToolbar>
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
                <Popup>
                  <p>You're here!</p>
                </Popup>
              </Marker>
              {spots.map((spot) => {
                return (
                  <Marker position={spot.lat_lon} key={spot.id}>
                    <Popup className="ion-text-center">
                      <h6 style={{ textAlign: "center" }}>{spot.title}</h6>
                      <IonButton
                        size="small"
                        color="secondary"
                        href={`https://www.google.com/maps/search/?api=1&query=${spot.lat_lon}`}
                      >
                        Google Maps
                      </IonButton>
                    </Popup>
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
        <IonCard className="weathercard">
          {weather ? (
            <div style={{ padding: "1em" }}>
              <h6 style={{ color: "black" }}>{weather.name}</h6>
              <p>
                <b>
                  {Date().toLocaleString().split("", 21)} ,{" "}
                  {weather.weather[0].description}
                </b>
              </p>
              <table
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <tr>
                  <td style={{ paddingLeft: "2em" }}>
                    <h1 style={{ color: "black" }} className="ion-text-center">
                      {(weather.main.temp - 273.15).toFixed()}
                      {"°C"}
                    </h1>
                  </td>
                  <td style={{ paddingLeft: "2em" }}>
                    {" "}
                    <IonImg
                      className="ion-center"
                      style={{
                        width: "60%",
                        height: "60%",
                        verticalAlign: "center",
                      }}
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    />
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <IonText class="ion-text-center" color="dark">
              <h5>..Loading Weather</h5>
            </IonText>
          )}
        </IonCard>
        <IonSlides pager={true} options={{ pagination: true }}>
          {spots.map((spot) => {
            if (spot.photo == "/media/nopic" || spot.photo == null) {
              return (
                <IonSlide key={spot.id}>
                  <IonCard class="ion-text-center">
                    <IonImg src={noimg} />
                    <IonCardTitle>{spot.title}</IonCardTitle>
                    <IonCardContent>
                      <p>{spot.description}</p>
                      <p>by {spot.owner}</p>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              );
            } else {
              return (
                <IonSlide key={spot.id}>
                  <IonCard class="ion-text-center">
                    <IonImg
                      src={`http://localhost:8000${spot.photo}`}
                      style={{ height: "50vw" }}
                    />
                    <IonCardTitle onClick={() => setShowModal(true)}>
                      {spot.title}
                    </IonCardTitle>
                    <p>{spot.description}</p>
                    <p>by {spot.owner}</p>
                  </IonCard>
                </IonSlide>
              );
            }
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

/*
                  <IonModal
                    isOpen={showModal}
                    cssClass="my-custom-class"
                    swipeToClose={true}
                  >
                    <IonContent>
                      <IonToolbar></IonToolbar>
                      <h1>{spot.title}</h1>
                      <IonImg
                        src={`http://localhost:8000${spot.photo}`}
                        style={{ height: "50vw" }}
                      />
                      <h3>{spot.description}</h3>

                      <IonButton
                        shape="round"
                        color="secondary"
                        href={`https://www.google.com/maps/search/?api=1&query=${spot.lat_lon}`}
                      >
                        Open in Google Maps
                      </IonButton>
                      <IonImg></IonImg>
                      <IonButton
                        shape="round"
                        onClick={() => setShowModal(false)}
                      >
                        Close Modal
                      </IonButton>
                    </IonContent>
                  </IonModal>

                  */
