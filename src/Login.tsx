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
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTab,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  logInOutline,
  bonfireOutline,
  personOutline,
  lockClosedOutline,
} from "ionicons/icons";
const loginPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-align-self-center">
            <IonCol className="ion-align-self-center" size="7">
              <h2>Login</h2>
            </IonCol>
            <IonCol className="ion-align-self-center" size="">
              <IonButton
                color="secondary"
                fill="outline"
                shape="round"
                href="/register"
              >
                <IonIcon slot="start" icon={bonfireOutline} />
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <p>Welcome to Adventurer's Atlas!</p>
          </IonRow>
          <IonRow>
            <p>Come see where people camp and spend their time outdoors!</p>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={personOutline}></IonIcon>
              </IonLabel>
              <IonInput placeholder="Email" type="email"></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={lockClosedOutline}></IonIcon>
              </IonLabel>
              <IonInput placeholder="Password" type="password"></IonInput>
            </IonItem>
          </IonCol>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-align-self-center">
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
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonItem class="ion-text-center" lines="none">
          <IonLabel>Don't have an account?</IonLabel>
          <IonButton
            color="secondary"
            fill="outline"
            shape="round"
            href="/register"
          >
            <IonIcon slot="start" icon={bonfireOutline} />
            Join the Community!
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
export default loginPage;
