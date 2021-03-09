import React, { useState } from "react";
import { Toast } from "./toast";
import logimg from "./assets/img/Register2.png";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
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

  console.log("isAuthenticated:" + isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/mapview" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonImg src={logimg} />
        <form className="ion-padding" onSubmit={(e) => onSubmit(e)}>
          <IonItem>
            <IonLabel>
              <IonIcon icon={atOutline} color="secondary"></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Email"
              type="email"
              name="email"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <br />
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline} color="secondary"></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Username"
              name="username"
              type="text"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <br />
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline} color="secondary"></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="First Name"
              type="text"
              name="first_name"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <br />
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline} color="secondary"></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Last Name"
              type="text"
              name="last_name"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <br />
          <IonItem>
            <IonLabel>
              <IonIcon icon={lockClosedOutline} color="secondary"></IonIcon>
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
              <IonIcon icon={lockClosedOutline} color="secondary"></IonIcon>
            </IonLabel>
            <IonInput
              placeholder="Re-type Password"
              type="password"
              name="re_password"
              onIonChange={(e) => onChange(e)}
              required
            ></IonInput>
          </IonItem>
          <br></br>
          <IonButton
            type="submit"
            expand="block"
            size="large"
            shape="round"
            class="button_secondary_white_text"
          >
            <IonIcon slot="start" icon={bonfireOutline} />
            Register
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
