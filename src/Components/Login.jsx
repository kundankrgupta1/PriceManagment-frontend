import { useContext, useState } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import Loading from "./Loading";
import { SERVER_URI } from "../App";

const Login = () => {
	const { setIsAuth, setToken, setUser } = useContext(ContextProviderApp);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [otp, setOtp] = useState('');
	const [otpSent, setOtpSent] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [popup, setPopup] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!otpSent) {
			try {
				const res = await axios.post(`${SERVER_URI}/login`, { email, password });
				setSuccess(res.data.message);
				if (res.data.success) {
					setIsLoading(false);
					setSuccess(res.data.message);
					setPopup(true);
				}
				setTimeout(() => {
					if (res.data.success) {
						setOtpSent(true);
						setPopup(false);
					}
					setSuccess("");
				}, 2000);
			} catch (error) {
				setIsLoading(false);
				setError(error.response ? error.response.data.message : error.message);
				setPopup(true);
				setTimeout(() => {
					setPopup(false);
					setError("");
				}, 2000);
			}
		} else if (otpSent) {
			try {
				const res = await axios.post(`${SERVER_URI}/otp`, { email, otp });
				if (res.data.success) {
					setIsLoading(false);
					setSuccess(res.data.message);
					setPopup(true);
				}
				setTimeout(() => {
					if (res.data.success) {
						setPopup(false);
						setIsAuth(true);
						setToken(res.data.token);
						setUser(res.data.user);
						localStorage.setItem("token", res.data.token);
						localStorage.setItem("user", JSON.stringify(res.data.user));
						setIsLoading(false);
					}
					setSuccess("");
				}, 2000)
			} catch (error) {
				setIsLoading(false);
				setError(error.response ? error.response.data.message : error.message);
				setPopup(true);
				setTimeout(() => {
					setError("");
					setPopup(false);
				}, 2000);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="max-w-md lg:max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10 sm:mt-16 lg:mt-20">
				<div className="flex justify-center mb-8">
					<img src="kg-non-bg.png" alt="logo" className="h-12 md:h-16" />
				</div>
				{!otpSent && (
					<div>
						<h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h2>
						<div className="mb-4">
							<label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email:</label>
							<input
								id="email"
								type="email"
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password:</label>
							<div className="flex items-center px-4 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									className="w-full outline-none"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
								>
									{showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center items-center bg-blue-500 text-white font-medium py-2 rounded-sm hover:bg-blue-600 transition duration-200"
						>
							{isLoading ? <Loading style1="border-white w-6 h-6" style2={"text-white"} text="OTP sending..." /> : "Login"}
						</button>
					</div>
				)}

				{otpSent && (
					<div>
						<h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Enter OTP</h2>
						<div className="mb-4">
							<label htmlFor="otp" className="block text-gray-600 font-medium mb-2">OTP:</label>
							<input
								type="number"
								required
								onChange={(e) => setOtp(e.target.value)}
								value={otp}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full flex justify-center items-center bg-green-500 text-white font-medium py-2 rounded-sm hover:bg-green-600 transition duration-200"
						>
							{isLoading ? <Loading style1="border-white w-6 h-6" style2={"text-white"} text="Verifying..." /> : "Verify OTP"}
						</button>
					</div>
				)}
			</form>
			{
				popup &&
				(
					<div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
						<div
							className={`transform transition-transform duration-300 ease-in-out ${popup ? 'translate-y-0' : 'translate-y-full'
								} ${success ? "bg-green-300" : error ? "bg-red-300" : "bg-white"} p-6 shadow-lg rounded-t-lg w-full max-w-md sm:max-w-lg`}
						>
							{success && (
								<div className="w-fit mt-4 bg-green-300 rounded-sm text-black px-3 py-1">
									<p className="text-center">{success}</p>
								</div>
							)}
							{error && (
								<div className="w-fit mt-4 bg-red-300 rounded-sm text-black px-3 py-1">
									<p className="text-center">{error}</p>
								</div>
							)}
						</div>
					</div>
				)
			}
		</>
	);
};

export default Login;
