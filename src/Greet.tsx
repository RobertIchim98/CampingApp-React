import React from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logInOutline, bonfireOutline } from "ionicons/icons";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const greetPage = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/mapview" />;
  }

  return (
    <Router>
      <IonToolbar class="ion-text-center">
        <IonTitle>Adventurer's Atlas</IonTitle>
      </IonToolbar>
      <IonContent class="vertical-center">
        <IonItem class="ion-text-center">
          <IonLabel>
            <IonButton
              expand="block"
              color="success"
              size="large"
              shape="round"
              href="/login"
              routerDirection="forward"
            >
              <IonIcon slot="start" icon={logInOutline} />
              Login
            </IonButton>
          </IonLabel>
        </IonItem>
        <IonItem class="ion-text-center" lines="none">
          <IonLabel>
            <h3>Dont have an account?</h3>
            <IonButton
              expand="block"
              color="secondary"
              size="large"
              shape="round"
              href="/register"
            >
              <IonIcon slot="start" icon={bonfireOutline} />
              Join the community
            </IonButton>
          </IonLabel>
        </IonItem>
      </IonContent>
    </Router>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(greetPage);
