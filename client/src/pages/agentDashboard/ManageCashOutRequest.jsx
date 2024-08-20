/** @format */

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import DashboardSectionTitle from "../../components/DashboardSectionTitle";
const ManageCashOutRequest = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");
	const {
		data: allCashInRequest = [],
		isPending,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["allCashOutRequest", search, filter],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/all-cashout-request/${user.phone}?search=${search}&filter=${filter}`,
			);
			return data;
		},
	});
	const confirmCashOut = (query) => {
		const { transaction, event } = query;
		console.log(transaction);
		Swal.fire({
			title: "Are you sure?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure.patch(`/confirm-cashout`, transaction).then((res) => {
					console.log(res);
					if (
						res.data.updateUserBalance.modifiedCount > 0 &&
						res.data.updateAgentBalance.modifiedCount > 0
					) {
						refetch();
						Swal.fire({
							title: "Done!",
							icon: "success",
						});
					}
				});
			}
		});
	};

	const handleSearch = (event) => {
		event.preventDefault();
		const search = event.target.search.value;
		setSearch(search);
	};

	if (isPending || isLoading) return <Loader />;
	return (
		<>
			<div className="bg-gray-100 w-full px-3 font-bold p-3">
				<DashboardSectionTitle text={"Manage User CashOut Request"} />
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
							{allCashInRequest?.map((transaction, index) => (
								<tr key={transaction._id}>
									<td>{index + 1}</td>
									<td>{transaction.cashOuterDetail?.name}</td>
									<td>{transaction.cashOuterDetail?.phone}</td>
									<td>{transaction.amount}</td>
									<td className="">
										<select
											onChange={() =>
												confirmCashOut({
													transaction,
													event: event.target.value,
												})
											}
											className="w-full h-10 border-2 border-sky-300 focus:outline-none focus:border-sky-300 text-sky-300 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
										>
											<option value="role" disabled selected>
												Confirm CashOut
											</option>
											{transaction.status === "success" ? (
												<option disabled>Success</option>
											) : (
												<>
													<option value="confirm">Confirm</option>
													<option value="reject">Reject</option>
												</>
											)}
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default ManageCashOutRequest;
