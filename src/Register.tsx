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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    re_password: "",
  });
  const {
    username,
    email,
    firstName,
    lastName,
    password,
    re_password,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(formData);
    if (formData.password == formData.re_password) {
      console.log("Passwords okay!");
    } else {
      console.log("passdontmatch");
      Toast("Passwords don't match!", "danger");
    }
    //register(all the form data here);
  };
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
              name="firstName"
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
              name="lastName"
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
            expand="block"
            color="secondary"
            size="large"
            shape="round"
            type="submit"
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
export default RegisterPage;
