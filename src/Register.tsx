import React, { useState } from "react";
import { Toast } from "./toast";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToast,
} from "@ionic/react";
import {
  logInOutline,
  bonfireOutline,
  personOutline,
  lockClosedOutline,
  atOutline,
} from "ionicons/icons";
import { signup } from "./actions/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const RegisterPage = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    re_password,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(username, first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }
  };
  /*
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  
  if (accountCreated) {
    return <Redirect to="/login" />;
  }
  */

  return (
    <IonPage>
      <IonContent>
        <h2 className="ion-padding">Register</h2>
        <p className="ion-padding">
          Welcome Adventurer! <br></br>Create you account and start your
          Journey:
        </p>
        <form className="ion-padding" onSubmit={(e) => onSubmit(e)}>
          <IonItem>
            <IonLabel>
              <IonIcon icon={atOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Email"
              type="email"
              name="email"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Username"
              name="username"
              type="text"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="First Name"
              type="text"
              name="first_name"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Last Name"
              type="text"
              name="last_name"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={lockClosedOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Password"
              type="password"
              name="password"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={lockClosedOutline}></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Re-type Password"
              type="password"
              name="re_password"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <IonButton
            type="submit"
            expand="block"
            color="secondary"
            size="large"
            shape="round"
          >
            <IonIcon slot="start" icon={bonfireOutline} />
            Join the Community!
          </IonButton>
          <IonItem class="ion-text-center" lines="none">
            <IonLabel>Already have an account?</IonLabel>
            <IonButton
              color="success"
              fill="outline"
              shape="round"
              href="/login"
            >
              <IonIcon slot="start" icon={logInOutline} />
              Login
            </IonButton>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(RegisterPage);
