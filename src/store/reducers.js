import { combineReducers } from "redux";
import {
  ADS_CREATED,
  ADS_LOADED,
  AUTH_LOGIN,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

const defaultState = {
  auth: false,
  ads: [],
  ui: {
    isFetching: false,
    error: null,
  },
};

// function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return {
//         ...state,
//         auth: true,
//       };
//     case AUTH_LOGOUT:
//       return {
//         ...state,
//         auth: false,
//       };
//     case ADS_LOADED:
//       return {
//         ...state,
//         ads: action.payload,
//       };
//     case ADS_CREATED:
//       break;

//     default:
//       return state;
//   }
// }

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function ads(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED:
      return action.payload;
    case ADS_CREATED:
      break;

    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isFetching: true, error: null };
    case AUTH_LOGIN_SUCCESS:
      return { isFetching: false, error: null };
    case AUTH_LOGIN_FAILURE:
      return { isFetching: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// export default function combinedReducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//     ads: ads(state.ads, action),
//   };
// }

// export default combineReducers({ auth: auth, ads: ads });
