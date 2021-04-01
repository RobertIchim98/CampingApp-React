import React from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonImg,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, logout, load_user } from "./actions/auth";
import noimg from "./assets/img/noimg.jpeg";

const SettingsPage = ({ logout, isAuthenticated, load_user }) => {
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    load_user().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <IonToolbar></IonToolbar>
        <IonCard class="ion-text-center">
          <IonAvatar style={{ align: "center" }}>
            <IonImg src={noimg} />
          </IonAvatar>
          <IonText>
            <h5>
              {user["first_name"]} {user["last_name"]}
            </h5>
            <h5>{user["email"]}</h5>
            <h5>{user["username"]}</h5>
          </IonText>
        </IonCard>
        <div>Settings</div>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout, load_user })(SettingsPage);
