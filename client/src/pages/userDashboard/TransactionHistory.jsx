/** @format */

import { useState } from "react";
import DashboardSectionTitle from "../../components/DashboardSectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TransactionHistory = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");

	const {
		data: transactions = [],
		isPending,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["transactions", search, filter],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/transaction/user=${user?.phone}?search=${search}&filter=${filter}`,
			);
			return data;
		},
	});
	console.log(transactions);

	const handleSearch = (event) => {
		event.preventDefault();
		const search = event.target.search.value;
		setSearch(search);
	};

	return (
		<>
			<div className="bg-gray-100 w-full px-3 font-bold p-3">
				<DashboardSectionTitle text={"My transaction History"} />
				<form
					onSubmit={handleSearch}
					className="flex flex-col my-3 md:flex-row gap-3"
				>
					<div className="flex">
						<input
							type="text"
							name="search"
							placeholder="Search for by email you like"
							className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-300 focus:outline-none focus:border-sky-300"
						/>
						<button
							type="submit"
							className="bg-sky-300 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
						>
							Search
						</button>
					</div>
					<select
						onChange={(e) => setFilter(e.target.value)}
						id="roleType"
						name="roleType"
						className="w-full h-10 border-2 border-sky-300 focus:outline-none focus:border-sky-300 text-sky-300 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
					>
						<option value="All" disabled selected>
							Filter By Status
						</option>
						<option value="pending">Pending</option>
						<option value="success">Success</option>
					</select>
				</form>
				<div className="overflow-x-auto  rounded-t-2xl">
					<table className="table text-center w-full">
						{/* head */}
						<thead>
							<tr className="bg-orange-200 ">
								<th></th>
								<th>User Name</th>
								<th>User Phone</th>
								<th>Requested Amount</th>
								<th className="ml-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{transactions.length > 0
								? transactions?.map((transaction, index) => (
										<tr key={transaction.user._id}>
											<td>{index + 1}</td>
											<td>{transaction.user?.name}</td>
											<td>{transaction.user?.phone}</td>
											<td>{transaction.amount}</td>
											<td className="">Details</td>
										</tr>
								  ))
								: ""}
						</tbody>
					</table>
					{transactions.length ? (
						""
					) : (
						<p className="text-5xl text-red-300 p-6">
							Your Transaction is Empty
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default TransactionHistory;
