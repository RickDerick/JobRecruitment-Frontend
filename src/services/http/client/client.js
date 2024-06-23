import axios from "axios";
import { apiBaseUrl } from "../../../environments";
import { AuthService } from "../../../modules/Auth";

/**
 * Axios basic configuration
 */
const config = {
  baseURL: apiBaseUrl,
};

/**
 * Creating the instance of Axios
 * It is because, in large scale applications, we may need
 * to consume APIs from more than a single server,
 */
const client = axios.create(config);

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing request.
 * @param {*} config
 */
const authInterceptor = (config) => {
  if (AuthService.check()) {
    config.headers.Authorization = `Bearer ${AuthService.token}`;
    config.headers.Company = AuthService.company ? AuthService.company.id : "";
  }
  
  if (!config.headers) {
    config.headers = {};
  }

  config.headers.Accept = "application/json";  // Corrected from "Application/json" to "application/json"
  config.headers["Access-Control-Allow-Origin"] = "*";
  
  return config;
};

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = (config) => {
  // console.log('Starting Request', config);
  return config;
};

/** Adding the request interceptors */
client.interceptors.request.use(authInterceptor);
client.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
client.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return Promise.resolve(response);
  },
  (error) => {
    // console.log('Response Error:', error); // Log response errors
    // Logout if unauthenticated
    if (error.response && error.response.status === 401) AuthService.logout();

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      error.response.data.message =
        errorMessage.length > 160
          ? JSON.parse(errorMessage.split("code :").pop())
              .error.message.split(":")[0]
              .split("CorrelationId")[0]
          : errorMessage;
    }
    throw error;
  }
);

export default client;
