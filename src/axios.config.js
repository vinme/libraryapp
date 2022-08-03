const axios = require('axios')

const defaultOptions = {
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
};

let axiosInstance = axios.create(defaultOptions);

export default axiosInstance;