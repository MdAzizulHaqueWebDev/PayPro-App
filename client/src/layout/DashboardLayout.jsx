/** @format */

import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
const DashboardLayout = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="bg-gray-100">
			<button
				onClick={() => setOpen(!open)}
				className="text-gray-500 block lg:hidden absolute top-5 left-4 focus:outline-none focus:text-gray-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
			<div className="flex">
				<div
					className={` ${
						open ? "absolute block" : "hidden"
					} md:flex flex-col w-64`}
				>
					<div className="flex flex-col flex-1 overflow-y-auto">
						<button
							onClick={() => setOpen(!open)}
							className="text-gray-500 text-3xl block lg:hidden absolute top-5 right-8 rounded-full border border-rose-500 focus:outline-none focus:text-gray-700"
						>
							X
						</button>
						<Sidebar />
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
