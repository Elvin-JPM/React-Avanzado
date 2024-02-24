import { getData, postData, deleteData } from "./api";
import storage from "./storage";

let authToken = storage.get("authToken");
let sessionToken = sessionStorage.getItem("authToken");
let token = authToken || sessionToken;

//////////////////////// LOGIN ///////////////////////////////////////

export const login = async (requestBody, remember) => {
  try {
    const response = await postData("/auth/login", requestBody);
    if (response) {
      remember
        ? storage.set("authToken", response.data.accessToken)
        : sessionStorage.setItem("authToken", response.data.accessToken);
      authToken = storage.get("authToken");
      sessionToken = sessionStorage.getItem("authToken");
      token = authToken || sessionToken;
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    throw error;
  }
};

/////////////////////////// GET ADS //////////////////////////////

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
      throw new Error(`Couldn't load data (ads)`);
    }
  } catch (error) {
    throw error;
  }
};

///////////////////////////////// LOAD ONE AD ///////////////////

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
      throw new Error(`Couldn't load data (ad)`);
    }
  } catch (error) {
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

//////////////////// DELETE AD /////////////////////////////////

export const deleteAd = async (id) => {
  await deleteData(`/v1/adverts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

///////////////////// GET TAGS /////////////////////////////////

export const getTags = async () => {
  const response = await getData("/v1/adverts/tags");
  console.log(response);
  return response;
};
