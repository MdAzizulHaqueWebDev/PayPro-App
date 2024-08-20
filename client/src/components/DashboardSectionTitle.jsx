/** @format */

const DashboardSectionTitle = ({ text }) => {
	return (
		<div className="my-5 shadow-sm">
			<h1 className="text-2xl p-3 font-bold text-center border-b-2 underline-offset-1">
				{text}
			</h1>
		</div>
	);
};

export default DashboardSectionTitle;
