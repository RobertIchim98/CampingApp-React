import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "./actions/auth";
import { Redirect } from "react-router";
import logimg from "./assets/img/Login4.png";
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
} from "ionicons/icons";
import { Toast } from "./toast";

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
    login(email, password).then((res) => {
      if (res.status === 200) {
        Toast("Welcome!", "primary");
      } else {
        Toast("Email/Password not correct", "danger");
      }
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/mapview" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonImg src={logimg} />
        <form className="ion-padding" onSubmit={(e) => onSubmit(e)}>
          <br></br>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline} color="primary"></IonIcon>
            </IonLabel>
            <IonInput
              type="email"
              placeholder="Email"
              name="email"
              onIonChange={(e) => onChange(e)}
              required
            />
          </IonItem>
          <br></br>
          <IonItem>
            <IonLabel>
              <IonIcon icon={lockClosedOutline} color="primary"></IonIcon>
            </IonLabel>
            <IonInput
              type="password"
              placeholder="Password"
              name="password"
              onIonChange={(e) => onChange(e)}
              required
            />
          </IonItem>
          <br></br>
          <IonButton
            type="submit"
            expand="block"
            size="large"
            shape="round"
            class="button_primary_white_text"
          >
            <IonIcon slot="start" icon={logInOutline} />
            Login
          </IonButton>
        </form>
        <p className="ion-text-center">Don't have an account?</p>
        <div className="ion-text-center">
          <IonButton
            size="small"
            color="secondary"
            fill="outline"
            shape="round"
            href="/register"
          >
            <IonIcon slot="start" icon={bonfireOutline} />
            Join the Community!
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
