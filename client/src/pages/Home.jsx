/** @format */
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Register from "../components/Register";
import { BiCross, BiX } from "react-icons/bi";

const Home = () => {
	let [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className="h-screen w-vw bg-fixed bg-[url(https://static.vecteezy.com/system/resources/previews/037/895/297/non_2x/male-working-with-profile-on-laptop-online-banking-payment-for-purchases-and-services-vector.jpg)] bg-transparent bg-cover bg-no-repeat dark:bg-gray-900 bg-opacity-40 flex items-center justify-center">
				<section className="flex gap-2 w-svw h-full bg-cover flex-col md:flex-row justify-center items-center bg-gradient-to-r from-slate-100 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
					<div>
						<img
							src="/home-page-banner.png"
							className="drop-shadow animate-pulse w-fit"
							alt="banner"
						/>
					</div>
					<div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4  ">
						<h1 className="mx-auto max-w-4xl font-display text-3xl lg:text-6xl font-bold tracking-normal text-white-300 dark:text-gray-300 ">
							Revolutionize Your Insurance
							<span className="relative whitespace-nowrap text-white-600 dark:text-gray-300">
								Operations
							</span>
							<span className="relative whitespace-nowrap text-rose-500 dark:text-rose-300">
								<svg
									aria-hidden="true"
									viewBox="0 0 418 42"
									className="absolute top-2/3 left-0 h-[0.58em] w-full fill-rose-500 dark:fill-orange-300/60"
									preserveAspectRatio="none"
								>
									<path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
								</svg>
								<span className="relative">with PayPro</span>
							</span>
						</h1>
						<h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-white-400 text-white-500 dark:text-gray-300 leading-7">
							Experience the future of insurance with our cutting-edge AI tool.
							From underwriting to claims processing, our intelligent system
							streamlines and enhances every aspect of your insurance
							operations.
						</h2>
						<button
							onClick={() => setIsOpen(true)}
							className="my-4 px-6 py-3 font-bold text-white bg-rose-400 rounded-full hover:bg-rose-700 dark:bg-rose-700 dark:text-white dark:hover:bg-rose-900 focus:outline-none focus:shadow-outline"
						>
							Create An Account
						</button>
						<>
							<Dialog
								open={isOpen}
								onClose={() => setIsOpen(false)}
								className="relative z-40 "
							>
								<div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
									<DialogPanel className="w-full h-svh border-orange-200 border bg-[url(https://static.vecteezy.com/system/resources/previews/037/895/297/non_2x/male-working-with-profile-on-laptop-online-banking-payment-for-purchases-and-services-vector.jpg)] bg-no-repeat bg-transparent bg-opacity-80 bg-cover bg-fixed md:p-12">
										<Register />
									</DialogPanel>
									<button
										className="text-4xl absolute hover:shadow-rose-400 transition-all top-10 z-50 right-8 rounded scale-95 hover:scale-105 shadow"
										onClick={() => setIsOpen(false)}
									>
										<BiX />
									</button>
								</div>
							</Dialog>
						</>
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
