import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import LoginReducer from "./store/Login/Login";
import AddUsersReducer from "./store/AddUsers/AddUsers";
import GlobalIdenetifierReducer from "./store/Globalidenetifiers/Globalidenetifiers";
import ProjectsReducer from "./store/Projects/ProjectsReducer";
import LocationReducer from "./store/Locations/LocationsReducers";
import LocsReducers from "./store/Locs/LocsReducer";
import LogsReducer from "./store/LogsReducer/LogsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  login: LoginReducer,
  newUser: AddUsersReducer,
  globalIdentifier: GlobalIdenetifierReducer,
  projects: ProjectsReducer,
  locations: LocationReducer,
  locs: LocsReducers,
  logs: LogsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper apiKey={"AIzaSyCAOnNDfeA7T9gaFY2NJSd6VLDQ6jl9US8"}>
          <App />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
