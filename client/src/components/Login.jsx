/** @format */

import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const phone = form.phone.value;
		const pin = form.pin.value;
		try {
			const { existUser } = await login(phone, pin);
			setLoading(false);
			existUser && toast.success("Login Successfully");
			navigate("/");
			// console.log({ existUser, token });
		} catch (error) {
			if (error.response?.status === 401 || error) {
				toast.error(error.response.data?.message || error?.message);
				setLoading(false);
			}
			console.log(error);
		}
	};

	return (
		<div className="bg-fixed bg-[url(https://static.vecteezy.com/system/resources/previews/037/895/297/non_2x/male-working-with-profile-on-laptop-online-banking-payment-for-purchases-and-services-vector.jpg)] bg-transparent bg-cover bg-no-repeat mt-4">
			<div
				id="login"
				className="max-w-lg mx-auto bg-indigo-50 rounded shadow flex flex-col justify-between p-3"
			>
				<form className="text-indigo-500" onSubmit={handleSubmit}>
					<fieldset className="border-4 border-dotted border-indigo-500 p-5">
						<legend className="px-2 italic -mx-2">Welcome again!</legend>
						<label
							className="text-xs font-bold after:content-['*'] after:text-red-400"
							htmlFor="phone"
						>
							Phone
						</label>
						<input
							className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="number"
							required
							id="phone"
						/>
						<label
							className="text-xs font-bold after:content-['*'] after:text-red-400"
							htmlFor="pin"
						>
							Pin{" "}
						</label>
						<input
							className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="number"
							required
							id="pin"
						/>
						<a className="block hover:underline  text-xs text-indigo-500 text-right mb-4">
							Forgot Pin?
						</a>
						<button
							disabled={loading}
							className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400"
						>
							{loading ? (
								<div className="flex justify-center">
									<ImSpinner9 className="animate-spin text-center" />
								</div>
							) : (
								"Login"
							)}
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default Login;
