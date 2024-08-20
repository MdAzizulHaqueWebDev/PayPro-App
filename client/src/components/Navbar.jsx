/** @format */

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BiMoney } from "react-icons/bi";

const Navbar = () => {
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const navLinks = (
		<div className="space-x-2">
			<NavLink to="/">
				<span className="inline-block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
					Home
				</span>
			</NavLink>

			{user ? (
				<>
					<div className="relative inline-block text-left">
						<div className="group">
							<span
								type="button"
								className="inline-flex justify-center items-center w-full  text-sm font-medium text-gray-900  focus:outline-none focus:bg-gray-700 rounded-lg p-2 border-b-2   transition-all duration-200 "
							>
								Services
								<svg
									className="w-4 h-4 ml-2 -mr-1"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
								</svg>
							</span>

							<div className="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
								<div className="py-1 space-y-2">
									<NavLink to="/send-money">
										<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
											Send Money
										</span>
									</NavLink>
									<NavLink to="/cash-in">
										<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
											Cash In
										</span>
									</NavLink>
									<NavLink to="/cash-out">
										<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
											Cash Out
										</span>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<NavLink to="/dashboard">
						<span className="inline-block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
							Dashboard
						</span>
					</NavLink>
				</>
			) : (
				""
			)}
		</div>
	);
	return (
		<div className="h-16 bg-slate-100">
			<header className="fixed inset-x-0 h-16 top-0 z-30 mx-auto max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg w-full md:rounded-3xl lg:max-w-screen-lg">
				<div className="px-4">
					<div className="flex items-center justify-between">
						<div className="flex shrink-0">
							<a aria-current="page" className="flex items-center" href="/">
								<img
									className="md:h-12 h-10 drop-shadow rounded w-auto"
									src="/logo.jpg"
									alt=""
								/>
								<p className="font-semibold mx-1 font-serif">PayPro</p>
							</a>
						</div>
						<div className="hidden md:flex md:items-center md:justify-center md:gap-5">
							{navLinks}
						</div>
						<div className="md:hidden">
							<div className="relative inline-block text-left">
								<div className="group">
									<span
										type="button"
										className="inline-flex justify-center items-center w-full  text-sm font-medium text-gray-900  focus:outline-none focus:bg-gray-700 rounded-lg p-1 border-b-2   transition-all duration-200 "
									>
										Services
										<svg
											className="w-4 h-4 ml-2 -mr-1"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
										</svg>
									</span>

									<div className="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
										<div className="py-1 space-y-2">
											<NavLink to="/">
												<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
													Home
												</span>
											</NavLink>
											<NavLink to="/send-money">
												<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
													Send Money
												</span>
											</NavLink>
											<NavLink to="/cash-in">
												<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
													Cash In
												</span>
											</NavLink>
											<NavLink to="/cash-out">
												<span className="block rounded-lg px-2 py-1 border-b-2 font-semibold  text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ">
													Cash Out
												</span>
											</NavLink>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-end gap-3">
							{user ? (
								<div className="flex items-center gap-2">
									{show ? (
										<div
											onClick={() => setShow(!show)}
											className="flex gap-1 items-center
										"
										>
											<BiMoney /> {user.balance} tk
										</div>
									) : (
										<p
											onClick={() => setShow(true)}
											className="text-xs w-fit hover:a"
										>
											<small>Tap to Show Amount</small>
										</p>
									)}
									{/* <p></p> */}
									<div className="avatar">
										<div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
											<img
												className="rounded-full"
												src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
											/>
										</div>
									</div>
								</div>
							) : (
								<Link
									to={"/login"}
									className="hidden lg:block items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
									href="/login"
								>
									Login
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
