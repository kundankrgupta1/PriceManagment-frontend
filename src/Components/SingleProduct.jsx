import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaHome } from "react-icons/fa"
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loading from "./Loading";
import { GiCheckMark } from "react-icons/gi";

const SingleProduct = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [productData, setProductData] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [popup, setPopup] = useState(false);
	const [updater, setUpdater] = useState(false);
	const [newPrice, setNewPrice] = useState("");
	const [message, setMessage] = useState("");
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [done, setDone] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const token = localStorage.getItem("token");
	const fetchSingleData = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`https://pricemanagment-backend.onrender.com/product/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.data.success) {
				setIsLoading(false)
				setProductData(res.data.product);
			}
			if (!res.data.success) {
				setIsLoading(false)
				setMessage(res.data.message);
				setNotFound(true);
			}
		} catch (error) {
			setIsLoading(false);
			setError(error.response ? error.response.data.message : error.message);
		}
	};

	const deleteProduct = async () => {
		setConfirmDelete(false);
		setIsLoadingDelete(true);
		try {
			const res = await axios.delete(`https://pricemanagment-backend.onrender.com/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.data.success) {
				setIsLoadingDelete(false);
				setMessage(res.data.message);
				setPopup(true);
				setDone(true);
			}
			setTimeout(() => {
				setMessage("");
				navigate("/");
				setPopup(false);
				setDone(false);
			}, 2000);
		} catch (error) {
			setIsLoadingDelete(false);
			setError(error.response ? error.response.data.message : error.message);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsLoadingUpdate(true);
		try {
			const res = await axios.put(`https://pricemanagment-backend.onrender.com/update/${id}`, { newPrice: newPrice }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.data.success) {
				setIsLoadingUpdate(false);
				setPopup(true);
				setMessage(res.data.message);
				setDone(true);
				setUpdater(false);
			}
			setTimeout(() => {
				setMessage("");
				setPopup(false);
				setDone(false);
				fetchSingleData();
			}, 2000);
		} catch (error) {
			setIsLoadingUpdate(false);
			setError(error.response ? error.response.data.message : error.message);
		}
	};


	useEffect(() => {
		fetchSingleData();
	}, [id]);

	const { product, product_image, brand, category, box_qty, single_price, box_price, priceHistory, createdAt } = productData || {};


	return (
		<>
			{isLoading &&
				<div className="flex justify-center items-center min-h-[80vh]">
					<Loading
						style1={"border-blue-600 w-16 h-16"}
						style2={"text-gray-500 font-bold text-xl"}
						text={"Loading Please wait..."}
					/>
				</div>
			}
			{!isLoading && error &&
				<div className="flex flex-col gap-2 justify-center items-center min-h-[80vh]">
					<img src="/no_internet.png" alt="Network Error" className="w-68" />
					<h1 className="text-2xl text-gray-500 font-extrabold">{error}!</h1>
					<div className="flex items-center gap-2">
						<Link to="/">
							<button className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400">
								<FaHome size={20} />Home
							</button>
						</Link>
						<button onClick={() => window.history.back()}
							className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400"
						>
							<IoArrowBack size={20} />Back
						</button>
					</div>
				</div>
			}
			{
				!isLoading && !error && notFound &&
				<div className="flex flex-col gap-2 justify-center items-center min-h-[80vh]">
					<img src="/not_found_nobg.png" alt="Network Error" className="w-48" />
					<h1 className="text-2xl text-gray-500 font-extrabold">{message}!</h1>
					<div className="flex items-center gap-2">
						<Link to="/">
							<button className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400">
								<FaHome size={20} />Home
							</button>
						</Link>
						<button onClick={() => window.history.back()}
							className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400"
						>
							<IoArrowBack size={20} />Back
						</button>
					</div>
				</div>
			}
			{!isLoading && !error && productData &&
				<div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
					<div className="flex items-center justify-start gap-4 mb-4">
						<Link to="/">
							<button className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400">
								<FaHome size={20} />Home
							</button>
						</Link>
						<button onClick={() => window.history.back()}
							className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400"
						>
							<IoArrowBack size={20} />Back
						</button>
						<button onClick={() => setConfirmDelete(true)}
							className="text-white flex items-center gap-2 bg-blue-600 px-4 py-2 text-base rounded-md hover:bg-blue-700 active:bg-blue-400"
						>
							{
								isLoadingDelete ? <Loading style1={"border-white w-6 h-6"} style2={"text-white"} /> : <><MdDelete size={20} />Delete</>
							}
						</button>
					</div>
					<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-3xl">
						<div className="flex flex-col md:flex-row items-center">
							<button onClick={() => setOpenImage(true)}>
								<img
									src={product_image}
									alt={product}
									className="w-40 h-40 object-contain rounded-lg border border-gray-200 mb-4 md:mb-0 md:mr-6"
								/>
							</button>
							<div className="flex flex-col items-center md:items-start">
								<h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left">{product}</h2>
								<p className="text-gray-500 mt-1 capitalize">Brand: {brand}</p>
								<p className="text-gray-500 mt-1 capitalize">Category: {category}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-3xl mt-6">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<h3 className="text-lg md:text-xl font-semibold text-gray-800">Price Details</h3>
							<span className="text-xs text-gray-500">{new Date(createdAt).toLocaleString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
								second: 'numeric',
								hour12: true
							})}</span>
						</div>
						<div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
							<div className="text-center sm:text-left">
								<p className="text-gray-600">Single Price</p>
								<div className="flex items-center gap-2">
									{
										updater ? <>
											<form onSubmit={handleUpdate} className="flex items-center gap-2">
												<input
													type="text"
													placeholder="new price"
													value={newPrice}
													onChange={(e) => setNewPrice(Number(e.target.value))}
													className="border border-gray-300 rounded-lg px-3 py-[4px] w-20"
												/>
												<button
													type="submit"
													className="border border-gray-300 rounded-lg px-3 py-[6px] hover:bg-green-500 hover:text-white active:bg-green-800"
												>
													{isLoadingUpdate ? <Loading style1={"border-white w-4 h-4"} /> : <FaCheck size={20} />}
												</button>
											</form>

											<button onClick={() => setUpdater(false)}>
												<IoMdClose size={20} />
											</button>

											{message && <p className="text-green-500">{message}</p>}
										</> : <>
											<p className="text-lg font-semibold text-gray-800">
												{single_price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
											</p>
											<button onClick={() => setUpdater(true)}>
												<FiEdit3 size={16} />
											</button>
										</>
									}
								</div>
							</div>
							<div className="text-center sm:text-left">
								<p className="text-gray-600">Box Quantity</p>
								<p className="text-lg font-semibold text-gray-800">{box_qty.toFixed(2)} nos</p>
							</div>
							<div className="text-center sm:text-left">
								<p className="text-gray-600">Total Price</p>
								<p className="text-lg font-semibold text-gray-800">{box_price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-3xl mt-6">
						<h3 className="text-lg md:text-xl font-semibold text-gray-800">Price History</h3>
						<div className="mt-4 border-l-2 border-gray-300 pl-4">
							{priceHistory?.length ? (
								priceHistory.map((entry, index) => (
									<div key={index} className="mb-6 relative">
										<div className="flex items-center">
											<div className="h-4 w-4 bg-blue-500 rounded-full -left-3 top-2 absolute"></div>
											<div className="pl-8">
												<p className="text-gray-500 text-sm">
													<span className="font-semibold text-gray-800">Date: </span>
													{new Date(entry.createdAt).toLocaleString('en-US', {
														weekday: 'long',
														year: 'numeric',
														month: 'long',
														day: 'numeric',
														hour: 'numeric',
														minute: 'numeric',
														second: 'numeric',
														hour12: true
													})}
												</p>

												<p className="text-gray-600">
													<span className="font-semibold text-gray-800">Single Price: </span>{entry.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
												</p>
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-600">No price history available.</p>
							)}
						</div>
					</div>
				</div>
			}
			{
				<div className={`${openImage ? "block" : "hidden"} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center`}>
					<div>
						<button onClick={() => setOpenImage(false)} className="float-right">
							<IoMdClose size={40} />
						</button>
						<img src={product_image} alt="" className="m-auto w-auto h-auto" />
					</div>
				</div >
			}
			{
				<div className={`${confirmDelete ? "block" : "hidden"} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center`}>
					<div className=" bg-white p-6 shadow-lg rounded-lg">
						<p className="text-center mb-4 font-bold text-2xl">Are you sure, you want to delete this product?</p>
						<div className="flex gap-4 justify-center items-center">
							<button onClick={deleteProduct} className="flex items-center gap-1 text-white bg-red-600 px-2 py-1 text-4xl rounded-sm shadow-lg hover:bg-red-700"><GiCheckMark size={40}/></button>
							<button onClick={() => setConfirmDelete(false)} className="flex items-center gap-1 text-white bg-green-600 px-2 py-1 text-4xl rounded-sm shadow-lg hover:bg-green-700"><IoMdClose size={40}/></button>
						</div>
					</div>
				</div >
			}
			{
				popup && (
					<div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
						<div
							className={`transform transition-transform duration-300 ease-in-out ${popup ? 'translate-y-0' : 'translate-y-full'
								} ${done ? "bg-green-300" : "bg-red-400"} p-6 shadow-lg rounded-t-lg w-full max-w-md sm:max-w-lg`}
						>
							<p className="text-center mb-4">{message}</p>
						</div>
					</div>
				)
			}
		</>
	);
};

export default SingleProduct;


/*
<div>
	<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-3xl">
		<h3 className="text-lg md:text-xl font-semibold text-gray-800">Update Price</h3>
		<div className="mt-4 border-l-2 border-gray-300 pl-4">
			<h1>hello popup</h1>
		</div>
	</div>
</div>
*/