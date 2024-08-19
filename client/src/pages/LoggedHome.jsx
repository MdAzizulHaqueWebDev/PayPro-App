/** @format */
import { Link } from "react-router-dom";
import cashIn from "../assets/cash-in-icon.jpg";
import cashOut from "../assets/cash-out.jpg";
import sendMoney from "../assets/send-money-icon.jpg";
import banner from "../assets/services-banner.jpg";
const LoggedHome = () => {
	return (
		<div className="bg-slate-100">
			<section className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="w-full md:w-1/2 mb-8 md:mb-0">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
							"Wherever needed <br /> PayPro is there."
						</h1>
						<p className="text-xl text-gray-600 mb-6">
							We're revolutionizing the industry with <br /> innovative
							solutions tailored to your needs.
						</p>
						<a
							href="#"
							className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
						>
							Explore More
						</a>
					</div>

					<div className="w-full md:w-1/2">
						<img className="backdrop-filter rounded" src={banner} alt="" />
					</div>
				</div>
			</section>
			<h1 className="text-2xl font-semibold text-center font-sans">
				Select A Service
			</h1>
			<div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4 md:p-8">
				<div className="px-8 py-12 rounded-xl hover:shadow-sm shadow-emerald-200 bg-white border border-gray-100 bg-opacity-50">
					<div className="space-y-10 text-center">
						<div className="m-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
							<img src={sendMoney} alt="" />
						</div>
						<div className="space-y-2">
							<p className="text-gray-600">
								Upload diverse datasets containing various types of information
								for analysis.
							</p>
							<Link to="/send-money">
								<button className="font-semibold text-gray-800 px-3 py-2 rounded bg-emerald-300 transition">
									Send Money
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="px-8 py-12 rounded-xl hover:shadow-sm shadow-emerald-200 bg-white border border-gray-100 bg-opacity-50">
					<div className="space-y-10 text-center">
						<div className="m-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
							<img src={cashIn} alt="" />
						</div>
						<div className="space-y-2">
							<p className="text-gray-600">
								Upload diverse datasets containing various types of information
								for analysis.
							</p>
							<Link to="/cash-in">
								<button className="font-semibold text-gray-800 px-3 py-2 rounded bg-emerald-300 transition">
									Cash In
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="px-8 py-12 rounded-xl hover:shadow-sm shadow-emerald-200 bg-white border border-gray-100 bg-opacity-50">
					<div className="space-y-10 text-center">
						<div className="m-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
							<img src={cashOut} alt="" />
						</div>
						<div className="space-y-2">
							<p className="text-gray-600">
								Upload diverse datasets containing various types of information
								for analysis.
							</p>
							<Link to="/cash-out">
								<button className="font-semibold text-gray-800 px-3 py-2 rounded bg-emerald-300 transition">
									Cash Out
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoggedHome;
