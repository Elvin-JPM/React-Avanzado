import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./api/storage";

import configureStore from "./store";
import Root from "./Root";

const authToken = storage.get("authToken");
const sessionToken = sessionStorage.getItem("authToken");

const accessToken = authToken || sessionToken;

const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <App />
    </Root>
  </React.StrictMode>
);
