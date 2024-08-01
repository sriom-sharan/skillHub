import axios from "axios";

export const postData = async (route,data) => {
//   console.log('Request Data:', data); // Logging the data being sent
  try {
    // Sending data directly http://localhost:3000/auth/login
    const response = await axios.post('http://localhost:3000/'+route,data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Uncomment and add your token if required
        'Authorization': `Bearer ${localStorage. getItem("token")}`
      }
    });
    
    // Log the response data
    // console.log('Response Data:', response.data);
    
    return response.data; // Return the response data
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
  }
};

// https://skillhub-backend-6z2u.onrender.com/