/** @format */

// /** @format */
import { BiDetail, BiLockAlt, BiMoney, BiUser } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const Cashout = () => {
	const [loading, setLoading] = useState(false);
	const { user, setRefetchUser, refetchUser } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { balance } = user || {};
	const amountCheckerRegex = /^\d+$/;
	const handleCashOutForm = async (event) => {
		event.preventDefault();
		const form = event.target;
		const amount = parseInt(form.amount.value);
		if (!amountCheckerRegex.test(amount)) return toast.error("Invalid Amount");
		const agentPhoneNumber = form.receiver.value;
		const reference = form.reference.value;
		const pin = form.pin.value;
		if (amount > balance || balance === 0) {
			return toast.error("Your Balance Is Low");
		} else if (balance < 50) {
			return toast.error("Can't Cash Out less than 50 money");
		}

		const cashOutTransaction = {
			amount,
			pin,
			payStatus: "cashOut",
			agentPhoneNumber,
			reference,
			cashOuterDetail: user,
		};
		setLoading(true);
		const data = await axiosSecure.post("/cash-out", cashOutTransaction);
		if (data?.code) {
			const errorMessage = data.response.data.message;
			toast.error(errorMessage);
			setLoading(false);
			return;
		}
		if (data.status === 200) {
			setRefetchUser(!refetchUser);
			setLoading(false);
			toast.success("Cash Out Success");
			form.reset();
			// window.location.replace("/")
		}
		console.log(data);
	};
	return (
		<div className="bg-slate-100 text-gray-700 h-screen">
			<h1 className="text-4xl font-bold text-center font-mono mb-2 shadow  pt-4">
				Cash Out
			</h1>
			<form
				onSubmit={handleCashOutForm}
				className="border-t-4 border-b-2 drop-shadow border-gray-700 shadow-neutral-800 bg-slate-600 bg-opacity-20 bg-transparent rounded-b-sm md:rounded-t-[120px] rounded-3xl py-5"
			>
				<div className="max-w-xs mx-auto text-center space-y-2">
					<h3 className="font-bold text-xl ">Confirm Transfer</h3>
					<div className="relative text-gray-600">
						<span className="absolute start-0 bottom-3 dark:00">
							<BiMoney />
						</span>
						<input
							name="amount"
							type="number"
							className="block py-2.5 ps-6 pe-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder="Enter Your amount"
						/>
					</div>
					Amount
				</div>
				<div className="max-w-xs mx-auto text-center space-y-2">
					<div className="relative text-gray-600">
						<span className="absolute start-0 bottom-3 dark:00">
							<BiUser />
						</span>
						<input
							name="receiver"
							type="number"
							id="floating-phone-number"
							className="block py-2.5 ps-6 pe-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							placeholder="Enter Agent Number"
						/>
					</div>
					Phone Number
				</div>
				<section className="rounded-sm my-2 py-3">
					<div className="max-w-xs mx-auto text-center space-y-2 ">
						<div className="relative text-gray-600">
							<span className="absolute start-0 dark:00">
								<BiLockAlt />
							</span>
							<input
								name="pin"
								type="password"
								id="floating-phone-number"
								className="block py-2.5 ps-6 pe-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder="Enter Your pin"
							/>
						</div>
						<h5 className="font-bold ">Pin</h5>
					</div>
				</section>
				<div className="max-w-xs mx-auto text-center space-y-2">
					<div className="relative text-gray-600">
						<span className="absolute start-0 bottom-3 dark:00">
							<BiDetail />
						</span>
						<input
							name="reference"
							type="text"
							className="block py-2.5 ps-6 pe-0 w-full text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder="Enter Reference"
						/>
					</div>
					Reference
					<br />
					<button
						disabled={loading}
						type="submit"
						className="font-semibold text-center  text-gray-900 px-12 hover:bg-emerald-500 py-2 rounded bg-emerald-300 transition"
					>
						{loading ? (
							<span>
								<AiOutlineLoading className="animate-spin" />
							</span>
						) : (
							"Cash Out"
						)}
					</button>
				</div>
			</form>
			<>
				<h2 className="text-xl font-bold">Recent Transaction</h2>
				{/* <TransactionHistory /> */}
			</>
		</div>
	);
};

export default Cashout;
