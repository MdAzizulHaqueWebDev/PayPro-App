/** @format */
import { ImSpinner9 } from "react-icons/im";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
	const { createUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const form = event.target;
		const name = form.name.value;
		const phone = form.phone.value;
		const pin = form.pin.value;
		try {
			const { insertedId, acknowledged } = await createUser(name, phone, pin);
			if (insertedId && acknowledged) {
				setLoading(false);
				toast.success("Account created successfully");
				form.reset();
				navigate("/login")
			} else {
				toast.error("Sorry Account not created");
			}
		} catch (error) {
			if (error.response.status === 400 || error) {
				toast.error(error.response.data?.message || error.message);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<div className="h-screen p-4 my-auto dark:bg-gray-900">
				<div className="flex justify-center items-center justify-items-center">
					<div className="w-full mx-auto lg:w-2/4 bg-gray-300 bg-opacity-65 backdrop-blur-sm backdrop-saturate-200 border border-gray-300 border-opacity-30   dark:bg-gray-700 p-5 rounded-lg">
						<h3 className="py-2 text-2xl text-center text-gray-800 dark:text-white">
							Create an Account!
						</h3>
						<form
							onSubmit={handleSubmit}
							className="px-8 pt-6 pb-8 dark:bg-gray-800 rounded"
						>
							<div className="mb-4 md:flex md:justify-around">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label
										className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
										htmlFor="phone"
									>
										Phone Number
									</label>
									<input
										required
										name="number"
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="phone"
										type="number"
										placeholder="Your Phone Number"
									/>
								</div>
								<div className="md:ml-2">
									<label
										className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
										htmlFor="lastName"
									>
										User Name
									</label>
									<input
										required
										name="name"
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="UserName"
										type="text"
										placeholder="Your Name"
									/>
								</div>
							</div>
							<div className="mb-4 md:flex md:justify-around">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label
										className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
										htmlFor="pin"
									>
										Pin
									</label>
									<input
										required
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="pin"
										type="password"
										name="pin"
										// pattern="\d*"
										title="Please enter a numeric value"
										inputMode="numeric"
										pattern="[0-9]*"
										placeholder="******************"
									/>
								</div>
							</div>
							<div className="mb-6 text-center">
								<button
									disabled={loading}
									type="submit"
									className="w-full px-4 py-2 font-bold text-white bg-rose-400 rounded-full hover:bg-rose-700 dark:bg-rose-700 dark:text-white dark:hover:bg-rose-900 focus:outline-none focus:shadow-outline"
								>
									{loading ? (
										<div className="flex justify-center">
											<ImSpinner9 className="animate-spin text-center" />
										</div>
									) : (
										"Create Account"
									)}
								</button>
							</div>
							<hr className="mb-1 border-t" />
						</form>
						<div className="text-center">
							{/* <Link
								className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								// to={"/login"}
							>
								Already have an account? Login!
							</Link> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
