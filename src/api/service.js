import { getData, postData } from "./api";
import storage from "./storage";

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

export const getAds = async (token) => {
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
