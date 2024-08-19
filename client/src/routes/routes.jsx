/** @format */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import SendMoney from "../pages/SendMoney";
import ConditionalRoutes from "./ConditionalRoutes";
import Cashout from "../pages/userDashboard/Cashout/Cashout";
import CashIn from "../pages/userDashboard/CashIn/CashIn";
import UserDashboard from "../pages/userDashboard/UserDashboard";
import DashboardLayout from "../layout/DashboardLayout";
import ManageUsers from "../pages/admin/manageUser/ManageUsers";
import LoggedHome from "../pages/LoggedHome";
import MainLayout from "../layout/MainLayout";
import ManageCashInRequest from "../pages/agentDashboard/ManageCashInRequest";
const routes = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: (
			<h1 className="text-9xl font-bold">Sorry , page not found</h1>
		),
		children: [
			{
				index: true,
				element: (
					<ConditionalRoutes>
						<LoggedHome />
					</ConditionalRoutes>
				),
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/services",
				element: (
					<PrivateRoutes>
						<LoggedHome />
					</PrivateRoutes>
				),
			},
			{
				path: "/send-money",
				element: (
					<PrivateRoutes>
						<SendMoney />
					</PrivateRoutes>
				),
			},
			{
				path: "/cash-out",
				element: (
					<PrivateRoutes>
						<Cashout />
					</PrivateRoutes>
				),
			},
			{
				path: "/cash-in",
				element: (
					<PrivateRoutes>
						<CashIn />
					</PrivateRoutes>
				),
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoutes>
				<DashboardLayout />
			</PrivateRoutes>
		),
		children: [
			// user routes
			{
				index: true,
				element: <UserDashboard />,
			},
			// admin routes
			{
				path: "manage-user",
				element: <ManageUsers />,
			},
			
			// agent routes
			{
				path: "cashin-requested",
				element: <ManageCashInRequest />,
			},


		],
	},
]);
export default routes;
