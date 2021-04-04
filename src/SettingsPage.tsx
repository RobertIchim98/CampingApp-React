import React, { useState } from "react";
import {
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { checkAuthenticated, logout, load_user } from "./actions/auth";
import noimg from "./assets/img/noimg.jpeg";
import {
  caretForwardCircle,
  heart,
  logOutOutline,
  share,
  trash,
  close,
} from "ionicons/icons";

const SettingsPage = ({ logout, isAuthenticated, load_user }) => {
  const [user, setUser] = React.useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

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
        <div style={{ alignContent: "center" }}>
          <IonCard className="ion-text-center">
            <IonAvatar style={{ margin: "0 auto" }}>
              <IonImg color="primary" src={noimg} />
            </IonAvatar>
            <IonText>
              <h5>
                {user["first_name"]} {user["last_name"]}
              </h5>
              <h5>{user["email"]}</h5>
              <h5>{user["username"]}</h5>
            </IonText>
          </IonCard>
        </div>
        <IonItem style={{ alignContent: "center" }}>
          <h3>Settings</h3>
        </IonItem>
        <IonItem button onClick={() => setShowActionSheet(true)}>
          <IonLabel>
            <h3>Logout</h3>
          </IonLabel>
          <IonIcon src={logOutOutline} slot="end" size="large" />
        </IonItem>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Logout",
              role: "destructive",
              icon: logOutOutline,
              handler: () => {
                logout();
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        >
          <IonLabel>Are you sure you want to log out?</IonLabel>
        </IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout, load_user })(SettingsPage);
