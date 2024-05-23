import axios from "axios";
import { apiBaseUrl } from "@/environment";
import { AuthService } from "@/modules/auth";

export const client = axios.create({
	baseURL: apiBaseUrl,
	// timeout: 10000,
});


export const requestInterceptor = (config) => {
	if (AuthService.Check()) {
		config.headers.Authorization = `Bearer ${AuthService.Token()}`;
		!config.headers.Accept || !config.headers['Content-Type']  ? config.headers['Content-Type'] = "Application/json" : "";
	}
	config.validateStatus = function (status) {
		return status >= 200 && status < 300;
	  };
	return config;
};

export const errorInterceptor = (error) => {
	console.log("ERROR INTERCEPTOR", error);
	return Promise.reject(error);
};

client.interceptors.request.use(requestInterceptor, errorInterceptor);

export const reponseInterceptor = (response) => {
	console.log("RESPONSE INTERCEPTOR",response);
	return Promise.resolve(response?.data);
};


client.interceptors.response.use(reponseInterceptor, errorInterceptor);