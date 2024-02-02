import { postData } from "./api";
import storage from "./storage";

export const login = async (requestBody, remember) => {
  try {
    const response = await postData("/auth/login", requestBody);
    if (response) {
      if (remember) {
        storage.set("authToken", response.data.accessToken);
      } else {
        sessionStorage.setItem("authToken", response.data.accessToken);
      }
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    console.log("in service: ", error.message);
    throw error;
  }
};
