import {
  ADS_LOADED_SUCCESS,
  AD_CREATE_SUCCESS,
  AD_DETAIL_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  ads: { areLoaded: false, data: [] },
  ui: {
    isFetching: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function ads(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED_SUCCESS:
      return { areLoaded: true, data: action.payload };
    case AD_DETAIL_SUCCESS:
      return { areLoaded: false, data: [action.payload] };
    case AD_CREATE_SUCCESS:
      return { ...state, data: [action.payload, ...state.data] };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { isFetching: false, error: action.payload };
  }

  if (action.type.endsWith("/success")) {
    return { isFetching: false, error: null };
  }
  if (action.type.endsWith("/request")) {
    return { isFetching: true, error: null };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }
  return state;
}
