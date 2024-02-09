import { getData, postData } from "./api";
import storage from "./storage";
const authToken = storage.get("authToken");
const sessionToken = sessionStorage.getItem("authToken");
const token = authToken || sessionToken;

export const login = async (requestBody, remember) => {
  try {
    const response = await postData("/auth/login", requestBody);
    if (response) {
      remember
        ? storage.set("authToken", response.data.accessToken)
        : sessionStorage.setItem("authToken", response.data.accessToken);
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    throw error;
  }
};

export const getAds = async () => {
  try {
    const response = await getData("/v1/adverts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      return response;
    } else {
      throw new Error(`Couldn't load data`);
    }
  } catch (error) {
    throw error;
  }
};

export const loadAd = async (adId) => {
  try {
    const response = await getData(`/v1/adverts/${adId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      return response;
    } else {
      throw new Error(`Couldn't load data`);
    }
    //setAd(response);
  } catch (error) {
    console.log("Loading from service:", error);
    throw error;
  }
};

////////////////////// CREATE AD ///////////////////////////////

export const createAd = async (ad) => {
  try {
    const response = await postData("/v1/adverts", ad, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });
    if (response) {
      console.log("Response from create Add: ", response);
      return await response.data;
    } else {
      throw new Error("Could not create Ad.");
    }
  } catch (error) {
    throw error;
  }
};
