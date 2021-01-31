import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonRow } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { logInOutline, bonfireOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel >
                <IonInput type="email">Email</IonInput>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonItem>
              <IonLabel>
                <IonInput type="password">Password</IonInput>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton>
            <IonIcon slot="start" icon={logInOutline} />
              Login
              </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton>
            <IonIcon slot="start" icon={bonfireOutline} />
              Register
              </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonApp>
);

export default App;
