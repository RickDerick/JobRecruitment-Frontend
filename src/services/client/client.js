/* eslint-disable linebreak-style */
import { client as axiosInstance } from "./axios_instance";
/**
 * @constructor
 * @param {*} options Object
 * 
 * url: is the only required parameter for the options object.
 * 
 * GET: the default value for the method property of the options object. 
 * 
 * pass any valid config options for request: https://axios-http.com/docs/req_config
 */
const call = (options) => {
		return axiosInstance.request(options)
		// .catch((error) => {
		// 	console.log("REQUEST CATCH:",error);
		// 	return error;
		// 	// ?.response 
		// 	// ? error.response.data.message
		// 	// :error?.request 
		// 	// ? error?.request.response
		// 	// :error?.message 
		// 	// ? error.message
		// 	// : error?.config;
		// });
};

export default call;