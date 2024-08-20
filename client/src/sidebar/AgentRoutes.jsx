/** @format */

import { Link } from "react-router-dom";

const AgentRoutes = () => {
	return (
		<>
			<li className="dark:bg-gray-100 dark:text-gray-900">
				<Link
					to="/dashboard/cashin-requested"
					className="flex items-center p-2 space-x-3 rounded-md"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="w-5 h-5 fill-current dark:text-gray-600"
					>
						<path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
					</svg>
					<span>Request</span>
				</Link>
			</li>
		</>
	);
};

export default AgentRoutes;
