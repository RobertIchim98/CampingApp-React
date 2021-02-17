import { IonButton, IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "./actions/auth";

const MapView = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div> Hello User!</div>
      </IonContent>
    </IonPage>
  );
};
export default connect(null, { checkAuthenticated, load_user })(MapView);
