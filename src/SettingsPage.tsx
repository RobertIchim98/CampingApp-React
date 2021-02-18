import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, load_user } from "./actions/auth";
import { logout } from "./actions/auth";

const SettingsPage = ({ logout, isAuthenticated }) => {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect to="/greet" />;
  }

  return (
    <IonPage>
      <IonContent>
        <div>Settings</div>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(SettingsPage);
