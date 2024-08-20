/** @format */

import axios from "axios";
const instance = axios.create({
	baseURL: "https://paypro-server.vercel.app",
});
const useAxios = () => {
	return instance;
};

export default useAxios;
