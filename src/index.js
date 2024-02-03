import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./api/storage";

import configureStore from "./store";
import Root from "./Root";
import { createBrowserRouter } from "react-router-dom";

const authToken = storage.get("authToken");
const sessionToken = sessionStorage.getItem("authToken");

const accessToken = authToken || sessionToken;

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore({ auth: !!accessToken }, { router });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store} router={router} />
  </React.StrictMode>
);
