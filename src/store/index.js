import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as actionCreators from "./actions";
import { ads } from "./reducers";
import { thunk } from "redux-thunk";

const composeEnhancers = composeWithDevTools({ actionCreators });

const middleware = [thunk];

export default function configureStore(preloadedState) {
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

// window.__REDUX_DEVTOOLS_EXTENSION__();
