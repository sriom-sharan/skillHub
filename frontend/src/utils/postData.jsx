import axios from "./axios";

export const postData = async (route, data) => {
  try {
    const response = await axios.post(route, data);

    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend responded with an error
      console.error("API Error:", error.response.data);

      // Return backend error to the caller
      throw {
        type: "API_ERROR",
        status: error.response.status,
        data: error.response.data,
      };
    }

    if (error.request) {
      // Request was sent but server didn't respond
      throw {
        type: "NETWORK_ERROR",
        message: "Unable to connect to the server.",
      };
    }

    // Something went wrong before the request was sent
    throw {
      type: "REQUEST_ERROR",
      message: error.message,
    };
  }
};

export const putData = async (route, data) => {
  try {
    const response = await axios.put(route, data);

    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        type: "API_ERROR",
        status: error.response.status,
        data: error.response.data,
      };
    }

    if (error.request) {
      throw {
        type: "NETWORK_ERROR",
        message: "Unable to connect to the server.",
      };
    }

    throw {
      type: "REQUEST_ERROR",
      message: error.message,
    };
  }
};