import React from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { mapOutline, navigateOutline, settingsOutline } from "ionicons/icons";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import Login from "./Login";
import Register from "./Register";
import Greet from "./Greet";
import mapview from "./mapview";

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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/greet" exact component={Greet} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/mapview" component={mapview} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton href="/mapview" tab="mapview">
                <IonIcon icon={mapOutline}></IonIcon>
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton href="/spots" tab="spots">
                <IonIcon icon={navigateOutline}></IonIcon>
                <IonLabel>My Spots</IonLabel>
              </IonTabButton>
              <IonTabButton href="/settings" tab="settings">
                <IonIcon icon={settingsOutline}></IonIcon>
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
