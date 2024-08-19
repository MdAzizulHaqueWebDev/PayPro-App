/** @format */

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TransactionHistory = () => {
	const { user } = useAuth();
	const [transactions, setTransaction] = useState([]);
	const axiosSecure = useAxiosSecure();
	async function fetchData() {
		const { data } = await axiosSecure.get(`/transaction?user=${user?.phone}`);
		setTransaction(data);
	}
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<section className="flex items-center gap-2 flex-wrap">
				{transactions.length ? (
					transactions.slice(0, 10).map((transaction) => (
						<div key={transaction._id} className="w-fit px-6 py-6  text-center bg-gray-100 rounded-lg lg:mt-0 xl:px-10">
							<div className="space-y-4 xl:space-y-6">
								<img
									className="mx-auto rounded-full w-8"
									src="https://thispersondoesnotexist.com/images"
									alt="author avatar"
								/>
								<div className="space-y-2">
									<div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
										<h3 className="text-black">{transaction.receiverName}</h3>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>empty</p>
				)}
			</section>
		</>
	);
};

export default TransactionHistory;
