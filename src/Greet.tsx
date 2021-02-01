import React from "react";
import {
  IonApp,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonNav,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logInOutline, bonfireOutline } from "ionicons/icons";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { createNull } from "typescript";

const greetPage = () => {
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
export default greetPage;
