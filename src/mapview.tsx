import {
  IonButton,
  IonCard,
  IonContent,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { isThisTypeNode } from "typescript";

const MapView = ({ isAuthenticated, load_user }) => {
  const [name, setName] = React.useState([]);

  React.useEffect(() => {
    load_user().then((data) => setName(data));
  }, []);

  //var user_data = load_user();
  //load_user().then((value) =>
  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar color="primary" animated={true}></IonSearchbar>
        <IonCard>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </IonCard>
        <h1>Hello {name["first_name"]}!</h1>
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
