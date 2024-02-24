import { getTags } from "../api/service";
import { getAd, areAdsLoaded } from "./selectors";

import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCESS,
  AD_CREATE_FAILURE,
  AD_CREATE_REQUEST,
  AD_CREATE_SUCCESS,
  AD_DELETE_FAILURE,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_DETAIL_FAILURE,
  AD_DETAIL_REQUEST,
  AD_DETAIL_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  GET_TAGS_FAILURE,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

//////////////////////////////// LOGIN //////////////////////////////////////////

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
  return async function (dispatch, getState, { api: { login }, router }) {
    try {
      dispatch(authLoginRequest());
      await login(requestBody, remember);
      dispatch(authLoginSuccess());
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
}
////////////////////////// LOGOUT ///////////////////////////////////////////////
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

/////////////////////////// LOAD ADDS ///////////////////////////////////////////
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
  return async function (dispatch, getState, { api: { getAds } }) {
    if (areAdsLoaded(getState())) {
      return;
    }
    try {
      dispatch(adsLoadedRequest());
      const adsList = await getAds();
      dispatch(adsLoadedSuccess(adsList));
    } catch (error) {
      dispatch(adsLoadedFailure(error));
      throw error;
    }
  };
}

///////////  ADD DETAILL ///////////////////////////////////////////////////////

export const adDetailSuccess = (ad) => ({
  type: AD_DETAIL_SUCCESS,
  payload: ad,
});

export const adDetailRequest = () => ({
  type: AD_DETAIL_REQUEST,
});

export const adDetailFailure = (error) => ({
  type: AD_DETAIL_FAILURE,
  error: true,
  payload: error,
});

export function adDetail(adId) {
  return async function (dispatch, getState, { api: { loadAd }, router }) {
    if (getAd(adId)(getState())) {
      return;
    }
    try {
      dispatch(adDetailRequest());
      const ad = await loadAd(adId);
      dispatch(adDetailSuccess(ad));
    } catch (error) {
      dispatch(adDetailFailure(error));
      router.navigate("/notFound");
    }
  };
}

///////////////////  CREATE AD //////////////////////////////////////////////////

export const adCreateSuccess = (ad) => ({
  type: AD_CREATE_SUCCESS,
  payload: ad,
});

export const adCreateRequest = () => ({
  type: AD_CREATE_REQUEST,
});

export const adCreateFailure = (error) => ({
  type: AD_CREATE_FAILURE,
  error: true,
  payload: error,
});

export function adCreate(ad) {
  return async function (dispatch, _getState, { api: { createAd }, router }) {
    try {
      dispatch(adCreateRequest());
      const newAd = await createAd(ad);
      dispatch(adCreateSuccess(newAd));
      const to = `/adds/${newAd.id}`;
      router.navigate(to);
    } catch (error) {
      dispatch(adCreateFailure());
      console.log("Error at adCreate:", error);
    }
  };
}

//////////////////////////////////// DELETE AD ////////////////////////////////////////////

export const adDeleteSuccess = (ad) => ({
  type: AD_DELETE_SUCCESS,
  payload: ad,
});

export const adDeleteRequest = () => ({
  type: AD_DELETE_REQUEST,
});

export const adDeleteFailure = (error) => ({
  type: AD_DELETE_FAILURE,
  error: true,
  payload: error,
});

export function adDelete(ad) {
  return async function (dispatch, _getState, { api: { deleteAd }, router }) {
    try {
      dispatch(adDeleteRequest());
      await deleteAd(ad.id);
      dispatch(adDeleteSuccess(ad));
      const to = `/adds`;
      router.navigate(to);
    } catch (error) {
      dispatch(adDeleteFailure(error));
      console.log("Error at adCreate:", error);
    }
  };
}

///////////////////////////// GET TAGS ///////////////////////////////////////////

export const getTagsSuccess = (tags) => ({
  type: GET_TAGS_SUCCESS,
  payload: tags,
});

export const getTagsRequest = () => ({
  type: GET_TAGS_REQUEST,
});

export const getTagsFailure = (error) => ({
  type: GET_TAGS_FAILURE,
  error: true,
  payload: error,
});

export function getAllTags() {
  return async function (dispatch, _getState, { api: {}, router }) {
    try {
      dispatch(getTagsRequest());
      const tags = await getTags();
      dispatch(getTagsSuccess(tags));
    } catch (error) {
      dispatch(getTagsFailure(error));
      console.log("Error at adCreate:", error);
    }
  };
}

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
