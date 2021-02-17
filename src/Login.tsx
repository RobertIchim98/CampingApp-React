import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "./actions/auth";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import {
  logInOutline,
  bonfireOutline,
  personOutline,
  lockClosedOutline,
} from "ionicons/icons";
import { Redirect } from "react-router";

const LoginPage = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // is user authenticated
  //redirect to home page
  if (isAuthenticated) {
    console.log("You are authenticated");
    return <Redirect to="/mapview" />;
  } else {
    console.log("Not authenticated");
  }

  return (
    <IonPage>
      <IonContent>
        <h1 className="ion-padding">Login</h1>
        <IonButton
          color="secondary"
          fill="outline"
          shape="round"
          href="/register"
        >
          <IonIcon slot="start" icon={bonfireOutline} />
          Register
        </IonButton>
        <form className="ion-padding" onSubmit={(e) => onSubmit(e)}>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput
              type="email"
              placeholder="Email"
              name="email"
              onIonChange={(e) => onChange(e)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={lockClosedOutline}></IonIcon>
            </IonLabel>
            <IonInput
              type="password"
              placeholder="Password"
              name="password"
              onIonChange={(e) => onChange(e)}
              required
            />
          </IonItem>
          <IonButton
            type="submit"
            expand="block"
            color="success"
            size="large"
            shape="round"
          >
            <IonIcon slot="start" icon={logInOutline} />
            Login
          </IonButton>
        </form>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
