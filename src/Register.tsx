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
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  logInOutline,
  bonfireOutline,
  personOutline,
  lockClosedOutline,
  atOutline,
  calendarOutline,
} from "ionicons/icons";

const registerPage = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-align-self-center">
            <IonCol className="ion-align-self-center" size="7">
              <h2>Register</h2>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <p>
              Welcome Adventurer! <br></br>Create you account and start your
              Journey
            </p>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={personOutline}></IonIcon>
              </IonLabel>
              <IonInput placeholder="First Name" type="text"></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={personOutline}></IonIcon>
              </IonLabel>
              <IonInput placeholder="Second Name" type="text"></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={calendarOutline}></IonIcon>
              </IonLabel>
              <IonLabel> Birthday</IonLabel>
              <IonInput placeholder="Date of Birth" type="date"></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={atOutline}></IonIcon>
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
                color="secondary"
                size="large"
                shape="round"
                href="/register"
                routerDirection="forward"
              >
                <IonIcon slot="start" icon={bonfireOutline} />
                Join the Community!
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonItem class="ion-text-center" lines="none">
          <IonLabel>Already have an account?</IonLabel>
          <IonButton
            color="success"
            fill="outline"
            shape="round"
            href="/login"
            routerDirection="forward"
          >
            <IonIcon slot="start" icon={logInOutline} />
            Login
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
export default registerPage;
