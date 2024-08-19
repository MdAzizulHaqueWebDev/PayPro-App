/** @format */

import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";

const ConditionalRoutes = ({ children }) => {
	const { user } = useAuth();
	if (user) {
		return children;
	} else {
		return <Home />;
	}
};

export default ConditionalRoutes;
