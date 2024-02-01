import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import configureStore from "./store";
import Root from "./Root";
const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <App />
    </Root>
  </React.StrictMode>
);
