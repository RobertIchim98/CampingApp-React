import React from "react";
import { Route } from "react-router-dom";

import {
  IonApp,
  IonContent,
  IonFab,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { mapSharp, navigateSharp, settingsSharp, person } from "ionicons/icons";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import Login from "./Login";
import Register from "./Register";
import Greet from "./Greet";
import mapview from "./mapview";
import myspots from "./myspots";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Provider } from "react-redux";
import store from "./store";
import { IonReactRouter } from "@ionic/react-router";
import Layouts from "./hocs/Layouts";
import SettingsPage from "./SettingsPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <Layouts>
            <IonTabs>
              <IonRouterOutlet animated={false}>
                <Route path="" component={Greet} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/mapview" component={mapview} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/spots" component={myspots} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton href="/mapview" tab="mapview">
                  <IonIcon icon={mapSharp}></IonIcon>
                  <IonLabel>Discover</IonLabel>
                </IonTabButton>
                <IonTabButton href="/spots" tab="spots">
                  <IonIcon icon={navigateSharp}></IonIcon>
                  <IonLabel>My Spots</IonLabel>
                </IonTabButton>
                <IonTabButton href="/settings" tab="settings">
                  <IonIcon icon={person}></IonIcon>
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Layouts>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};
export default App;
