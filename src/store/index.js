import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as actionCreators from "./actions";
import { ads } from "./reducers";
import { thunk } from "redux-thunk";

const composeEnhancers = composeWithDevTools({ actionCreators });

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching ", action, store.getState());
  const result = next(action);
  console.log("final state", store.getState());
  console.groupEnd();
  return result;
};

const timestamp = () => (next) => (action) => {
  return next({
    ...action,
    meta: { ...action.meta, timestamp: new Date() },
  });
};

const middleware = [thunk, timestamp, logger];

export default function configureStore(preloadedState) {
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

// window.__REDUX_DEVTOOLS_EXTENSION__();
