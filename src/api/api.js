import axios from "axios";

const BASE_URL = "http://127.0.0.1:3001/api";

export async function postData(endpoint, requestBody, headers) {
  const body = requestBody;

  try {
    const response = await axios.post(BASE_URL + endpoint, body, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getData(endpoint, requestHeaders) {
  const headers = requestHeaders;

  try {
    const response = await axios.get(BASE_URL + endpoint, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteData(endpoint, requestHeaders) {
  const headers = requestHeaders;

  try {
    const response = await axios.delete(BASE_URL + endpoint, headers);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
