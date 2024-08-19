/** @format */

import { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";

// Create AuthContext
export const AuthContext = createContext(null);

// AuthProvider component
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const axios = useAxios();
	const [refetchUser, setRefetchUser] = useState(false);
	useEffect(() => {
		checkAuthState();
	}, [refetchUser]);

	const checkAuthState = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
						phone: localStorage.getItem("phone"),
					},
				};
				const { data: userInfo } = await axios.get("/logged-user", config);
				setUser(userInfo);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error(error);
			setUser(null);
		}
		setLoading(false);
	};

	const login = async (phone, pin) => {
		const { data } = await axios.post("/login", { phone, pin });
		setUser(data.existUser);
		localStorage.setItem("token", data.token);
		localStorage.setItem("phone", data.existUser.phone);
		return data;
	};

	const createUser = async (name, phone, pin) => {
		const { data } = await axios.post("/create-user", { name, phone, pin });
		return data;
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};
	return (
		<AuthContext.Provider value={{ user, loading, login, logout, createUser,setRefetchUser }}>
			{loading ? <Loader /> : children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
