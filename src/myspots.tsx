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

import { IonFab, IonFabButton, IonGrid, IonRow, IonCol } from "@ionic/react";

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
import { title } from "node:process";

const MySpots = ({ isAuthenticated, load_user }) => {
  //get username
  const [name, setName] = React.useState([]);
  const [spot, setSpot] = React.useState<any | null>(null);

  // set photo
  const { photos, takePhoto, blob } = usePhotoGallery();

  //get user data
  React.useEffect(() => {
    load_user().then((data) => setName(data));
  }, []);

  //get the current location
  const locationUser = useCurrentLocation();

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    spotlocation: {},
  });
  navigator.geolocation.getCurrentPosition((spot) => {
    //setFormData({ ...formData, spotlocation: spot });
    setSpot(spot);
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(title, description);
  };

  // handle spot submit
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    const { title, description, spotlocation } = formData;
    // title, description, name["username"], spot, photos[0]
    const newformData = new FormData();

    const location =
      "SRID=4326;POINT ( " +
      spot.coords.longitude +
      " " +
      spot.coords.latitude +
      ")";
    if (photos[0] !== undefined || photos.length != 0) {
      console.log(photos);
      newformData.append("location", location);
      newformData.append("title", title);
      newformData.append("owner", name["username"]);
      newformData.append("description", description);
      newformData.append("photo", blob, photos[0].filepath);
    } else {
      newformData.append("location", location);
      newformData.append("title", title);
      newformData.append("owner", name["username"]);
      newformData.append("description", description);
    }

    addSpot(newformData).then((res) => {
      console.log(formData);
      console.log(photos);
      if (res === 200) {
        Toast("Spot Added!", "primary");
      } else {
        //console.log(res);

        console.log(res["responseText"]);
        Toast("Missing some info!", "danger");
      }
    });
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
          {locationUser ? (
            <MapContainer
              center={[locationUser.latitude, locationUser.longitude]}
              zoom={15}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[locationUser.latitude, locationUser.longitude]}
              >
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
          <IonButton
            type="submit"
            shape="round"
            class="button_primary_white_text"
            style={{ width: "100%" }}
          >
            Add Spot
          </IonButton>
        </form>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
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
