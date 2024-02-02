import { login } from "../api/service";

import {
  ADS_LOADED,
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});
export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});
export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export function authLogin(requestBody, remember) {
  return async function (dispatch, getState) {
    try {
      dispatch(authLoginRequest());
      await login(requestBody, remember);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
}

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const adsLoadedSuccess = (ads) => ({
  type: ADS_LOADED_SUCCESS,
  payload: ads,
});

export const adsLoadedRequest = () => ({
  type: ADS_LOADED_REQUEST,
});

export const adsLoadedFailure = (error) => ({
  type: ADS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export function loadAds() {
  return async function (dispatch, getState) {
    try {
      dispatch(adsLoadedRequest);
      await login(requestBody, remember);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
}

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
