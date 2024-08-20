/** @format */

import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const DashboardLayout = () => {
	return (
		<div className="flex gap-3">
			<div className="h-screen">
				<Sidebar />
			</div>
			<div className="w-full p-3 overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
