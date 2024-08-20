/** @format */

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
const ManageUsers = () => {
	const axiosSecure = useAxiosSecure();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");
	const {
		data: users = [],
		isPending,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users", search, filter],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/all-users?search=${search}&filter=${filter}`,
			);
			return data;
		},
	});

	const changeRole = (query) => {
		const { user, event } = query;
		Swal.fire({
			title: "Are you sure?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure
					.patch(`/change-role?event=${event}&phone=${user.phone}`)
					.then((res) => {
						console.log(res);
						if (res.data.modifiedCount > 0) {
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
							Filter By Role
						</option>
						<option value="user">User</option>
						<option value="agent">Agent</option>
						<option value="pending">Pending</option>
					</select>
				</form>
				<div className="overflow-x-auto  rounded-t-2xl">
					<table className="table text-center w-full">
						{/* head */}
						<thead>
							<tr className="bg-orange-200 text-start">
								<th></th>
								<th>Name</th>
								<th>Role</th>
								<th className="ml-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{users?.map((user, index) => (
								<tr key={user._id}>
									<td>{index + 1}</td>
									<td>{user?.name}</td>
									<td>{user?.role}</td>
									<td className="">
										<select
											onChange={() =>
												changeRole({ user, event: event.target.value })
											}
											id="roleType"
											name="roleType"
											className="w-full h-10 border-2 border-sky-300 focus:outline-none focus:border-sky-300 text-sky-300 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
										>
											<option value="role" disabled selected>
												Change Role
											</option>
											<option
												value="user"
												className={`${user.role == "user" ? "hidden" : ""}`}
											>
												User
											</option>
											<option
												value="agent"
												className={`${user.role == "agent" ? "hidden" : ""}`}
											>
												Agent
											</option>
											<option
												value="admin"
												className={`${user.role == "admin" ? "hidden" : ""}`}
											>
												Admin
											</option>
											<option
												value="approve"
												className={`${
													user.status == "approve" ? "hidden" : ""
												}`}
											>
												Approve
											</option>
											<option
												value="reject"
												className={`${user.role == "reject" ? "hidden" : ""}`}
											>
												Reject
											</option>
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

export default ManageUsers;
