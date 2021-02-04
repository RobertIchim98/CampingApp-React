import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "./actions/auth";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import {
  logInOutline,
  bonfireOutline,
  personOutline,
  lockClosedOutline,
} from "ionicons/icons";

const LoginPage = ({ login }) => {
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

  return (
    <IonPage>
      <IonContent>
        <h1>Login</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <IonInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );

  //const mapStateToProps = (state) => ({
  // is authenticated?
  // });

  /*
  return (
    <IonPage>
      <IonContent>
        <h2>Login</h2>
        <IonButton
          color="secondary"
          fill="outline"
          shape="round"
          href="/register"
        >
          <IonIcon slot="start" icon={bonfireOutline} />
          Register
        </IonButton>
        <p>Welcome to Adventurer's Atlas!</p>
        <p>Come see where people camp and spend their time outdoors!</p>

        <IonItem>
          <IonLabel>
            <IonIcon icon={personOutline}></IonIcon>
          </IonLabel>
          <IonInput placeholder="Email" type="email"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>
            <IonIcon icon={lockClosedOutline}></IonIcon>
          </IonLabel>
          <IonInput placeholder="Password" type="password"></IonInput>
        </IonItem>
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
  */
};
export default connect(null, { login })(LoginPage);
