import React from "react";
import { Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import Login from "./Login";
import Register from "./Register";
import Greet from "./Greet";
import { BrowserRouter as Router, Switch } from "react-router-dom";

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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <Router>
          <Switch>
            <Route path="/greet" exact component={Greet} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </IonApp>
    </Provider>
  );
};

export default App;
