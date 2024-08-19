/** @format */

const Loader = () => {
	return (
		<div className="min-h-screen w-dvh flex justify-center items-center">
			<div className="flex flex-row gap-2">
				<div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
				<div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
				<div className="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
			</div>
		</div>
	);
};

export default Loader;
