/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
	const navigate = useNavigate();
	// Add a request interceptor
	axiosInstance.interceptors.request.use(
		(config) => {
			config.headers.authorization_token = `Bearer ${localStorage.getItem(
				"token",
			)}`;
			return config;
		},
		(error) => {
			console.log(error, "request error");
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// // Add a response interceptor
	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			// // Any status codes that falls outside the range of 2xx cause this function to trigger
			// // Do something with response error
			return error;
		},
	);
	return axiosInstance;
};

export default useAxiosSecure;
