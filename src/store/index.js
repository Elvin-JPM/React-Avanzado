import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as actionCreators from "./actions";
import { withExtraArgument } from "redux-thunk";
import { getAds, login, loadAd, createAd, deleteAd } from "../api/service";

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

const failureRedirects =
  (router, redirectsMap) => (store) => (next) => (action) => {
    const result = next(action);
    if (action.error) {
      const redirect = redirectsMap[action.payload.status];
      if (redirect) {
        router.navigate(redirect);
      }
    }
    return result;
  };

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    withExtraArgument({
      api: { login, getAds, loadAd, createAd, deleteAd },
      router,
    }),
    timestamp,
    failureRedirects(router, { 401: "/login", 404: "/notFound" }),
    logger,
  ];
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
