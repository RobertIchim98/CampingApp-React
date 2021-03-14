import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import campimg from "./assets/img/campimg.jpeg";
import backpack from "./assets/img/backpack.png";
import { useCurrentLocation } from "./actions/spots";
import { informationCircleOutline, mapOutline } from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSkeletonText,
  IonToolbar,
} from "@ionic/react";

const MySpots = ({ isAuthenticated, load_user }) => {
  const [name, setName] = React.useState([]);
  //const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    load_user().then((data) => setName(data));
  }, []);
  const { location, weather } = useCurrentLocation();

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    spotlocation: location,
  });
  const { title, description, spotlocation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //login(email, password);
    console.log(formData);
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
          <IonSkeletonText animated style={{ width: "100%", height: "60vw" }} />
        )}
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
            shape="round"
            type="submit"
            class="button_primary_white_text"
            style={{ width: "100%" }}
          >
            Add Spot
          </IonButton>
        </form>
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

/*
        <IonModal isOpen={showModal}>
          <div>
            <h1>Hello User! You can enter data here:</h1>
          </div>
          <IonInput placeholder="Title"></IonInput>
          <IonButton shape="round" class="button_primary_white_text">
            Submit
          </IonButton>
          <IonButton
            shape="round"
            class="button_secondary_white_text"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </IonButton>
        </IonModal>
*/
