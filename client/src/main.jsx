/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={routes} />
			</AuthProvider>
		</QueryClientProvider>
		<Toaster position="top-right" reverseOrder={true} />
	</React.StrictMode>,
);
