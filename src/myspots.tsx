import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { Photo, usePhotoGallery } from "./usePhotoGallery";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { useCurrentLocation, addSpot } from "./actions/spots";
import {
  informationCircleOutline,
  mapOutline,
  camera,
  trash,
  close,
} from "ionicons/icons";

import {
  IonTitle,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
} from "@ionic/react";

import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSkeletonText,
  IonToolbar,
} from "@ionic/react";
import { Toast } from "./toast";

const MySpots = ({ isAuthenticated, load_user }) => {
  //get username
  const [name, setName] = React.useState([]);

  //photo stuff
  const { photos, takePhoto } = usePhotoGallery();

  //get user data
  React.useEffect(() => {
    load_user().then((data) => setName(data));
  }, []);

  //get the current location
  const location = useCurrentLocation();

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    spotlocation: {},
  });
  const { title, description, spotlocation } = formData;
  navigator.geolocation.getCurrentPosition((spotlocation) => {
    setFormData({ ...formData, spotlocation: spotlocation });
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle spot submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (spotlocation != null) {
      addSpot(title, description, name["username"], spotlocation).then(
        (res) => {
          if (res.status == 200) {
            Toast("Spot Added!", "primary");
          } else {
            Toast("Could not add Spot!", "danger");
          }
        }
      );
    } else {
      Toast("Cant find location", "danger");
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar></IonToolbar>
        <h1>Hello {name["first_name"]}!</h1>
        <IonLabel>Where is the spot?</IonLabel>
        <IonCard>
          {location ? (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={15}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "60vw" }}
            />
          )}
        </IonCard>
        <form onSubmit={(e) => onSubmit(e)}>
          <IonItem>
            <IonLabel>
              <IonIcon src={mapOutline} />
            </IonLabel>
            <IonInput
              placeholder="Title"
              type="text"
              name="title"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon src={informationCircleOutline} />
            </IonLabel>
            <IonInput
              placeholder="Description"
              type="text"
              name="description"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonButton
            shape="round"
            type="submit"
            class="button_primary_white_text"
            style={{ width: "100%" }}
          >
            Add Spot
          </IonButton>
        </form>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(
  MySpots
);
