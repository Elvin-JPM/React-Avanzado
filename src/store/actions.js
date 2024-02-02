import { postData } from "../api/api";
import { login } from "../api/service";
import storage from "../api/storage";
import {
  ADS_LOADED,
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
      console.log("in authlogin: ", error.message);
      throw error;
    }
  };
}

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const adsLoaded = (ads) => ({
  type: ADS_LOADED,
  payload: ads,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
