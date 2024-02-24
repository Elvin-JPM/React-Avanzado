import {
  ADS_LOADED_SUCCESS,
  AD_CREATE_SUCCESS,
  AD_DELETE_SUCCESS,
  AD_DETAIL_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  GET_TAGS_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  ads: { areLoaded: false, data: [] },
  tags: [],
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
    case AD_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload),
      };
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case GET_TAGS_SUCCESS:
      return action.payload;
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
