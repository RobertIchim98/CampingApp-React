import React, { Component } from "react";
import PropTypes from "prop-types"; // new import
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
  atOutline,
} from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";

class Signup extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      secondname: "",
      email: "",
      password: "",
    };
  }
  onChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // update function to call the action
  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      firstname: this.state.firstname,
      secondname: this.state.secondname,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signupNewUser(userData); // <-- signup new user request
  };
}

const registerPage = () => {
  return (
    <IonPage>
      <IonContent>
        <h2>Register</h2>
        <p>
          Welcome Adventurer! <br></br>Create you account and start your Journey
        </p>
        <form>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <Controller
              as={<IonInput placeholder="Username" type="text"></IonInput>}
              name="username"
            ></Controller>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput placeholder="First Name" type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={personOutline}></IonIcon>
            </IonLabel>
            <IonInput placeholder="Second Name" type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonIcon icon={atOutline}></IonIcon>
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
            color="secondary"
            size="large"
            shape="round"
            href="/register"
            routerDirection="forward"
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
              routerDirection="forward"
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
export default registerPage;

/*
          <IonCol>
            <IonItem>
              <IonLabel>
                <IonIcon icon={calendarOutline}></IonIcon>
              </IonLabel>
              <IonLabel> Birthday</IonLabel>
              <IonInput placeholder="Date of Birth" type="date"></IonInput>
            </IonItem>
          </IonCol>
*/
