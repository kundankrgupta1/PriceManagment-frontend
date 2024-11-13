import axios from "axios";
import { useContext, useRef, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { ContextProviderApp } from "../Context/ContextProvider";
import Loading from "./Loading";
import BrandSelector from "./BrandSelector";
import CategorySelector from "./CategorySelector";

const AddProduct = ({ fetchData, fetchDataForBrand, fetchDataForCategory }) => {
	const { openAddForm, setOpenAddForm, brandName, setBrandName, categoryNameFiltered, setCategoryNameFiltered } = useContext(ContextProviderApp);
	const imageRef = useRef(null);
	const [product_image, setProduct_image] = useState(null);
	const [product, setProduct] = useState("");
	const [single_price, setSingle_price] = useState("");
	const [box_qty, setBoxQty] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [popup, setPopup] = useState(false);

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("product_image", imageRef.current.files[0]);
		formData.append("product", product);
		formData.append("brand", brandName.toLowerCase());
		formData.append("category", categoryNameFiltered.toLowerCase());
		formData.append("single_price", single_price);
		formData.append("box_qty", box_qty);

		try {
			const res = await axios.post(`https://pricemanagment-backend.onrender.com/add`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data"
				},
			});
			if (res.data.success) {
				setPopup(true);
				setSuccess(res.data.message);
				setTimeout(() => {
					setOpenAddForm(false);
					setSuccess("");
					fetchData();
					fetchDataForBrand();
					fetchDataForCategory();
					setPopup(false);
				}, 2000)
				setProduct("")
				setBrandName("")
				setCategoryNameFiltered("")
				setSingle_price("")
				setBoxQty("")
				setProduct_image(null)
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
			setPopup(true);
			setTimeout(() => {
				setError("");
				setPopup(false);
			}, 2000)
			setIsLoading(false);
		}
	}

	return (
		<div
			className={`${!openAddForm && "hidden"} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center overflow-y-scroll scrollbar-hide`}
		>
			<div className="w-full md:w-3/4 lg:w-1/2 m-auto bg-white shadow-lg rounded-lg p-8">
				<div className="mb-6 flex justify-between items-center">
					<h2 className="text-2xl font-bold text-center">Add Product</h2>
					<button onClick={() => setOpenAddForm(!openAddForm)}>
						<RiCloseLargeFill className="hover:text-red-600" size={20} />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-6">
						<div onClick={() => imageRef.current.click()} className="cursor-pointer flex justify-center items-center mb-4 md:mb-0">
							{product_image ? (
								<img src={product_image} alt="upload_icon" className="h-36" />
							) : (
								<img src="./upload.png" alt="upload_icon" className="h-36 grayscale" />
							)}
							<input
								type="file"
								className="hidden"
								ref={imageRef}
								onChange={(e) => setProduct_image(URL.createObjectURL(e.target.files[0]))}
							/>
						</div>
						<div className="flex flex-col space-y-4">
							<div>
								<label htmlFor="name" className="block mb-2 text-gray-900 font-medium">Product Name:</label>
								<input
									type="text"
									required
									className="border border-gray-300 w-full p-2 rounded-lg"
									onChange={(e) => setProduct(e.target.value)}
									value={product}
									placeholder="Enter product name"
								/>
							</div>
							<div>
								<label htmlFor="brand" className="block mb-2 text-gray-900 font-medium">Brand:</label>
								<BrandSelector />
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
						<div>
							<label htmlFor="category" className="block mb-2 text-gray-900 font-medium">Category:</label>
							<CategorySelector />
						</div>
						<div>
							<label htmlFor="price" className="block mb-2 text-gray-900 font-medium">Price:</label>
							<input
								type="text"
								required
								className="border border-gray-300 w-full p-2 rounded-lg"
								onChange={(e) => (setSingle_price(e.target.value))}
								value={single_price}
								placeholder="Enter price"
							/>
						</div>
						<div>
							<label htmlFor="box_qty" className="block mb-2 text-gray-900 font-medium">Box Quantity:</label>
							<input
								type="text"
								required
								className="border border-gray-300 w-full p-2 rounded-lg"
								onChange={(e) => setBoxQty(e.target.value)}
								value={box_qty}
								placeholder="Enter box quantity"
							/>
						</div>
						<div>
							<label htmlFor="box_price" className="block mb-2 text-gray-900 font-medium">Box Price:</label>
							<input
								type="text"
								required
								className="border border-gray-300 w-full p-2 rounded-lg"
								value={single_price * box_qty}
								disabled
								placeholder="Enter box price"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-full md:w-fit mt-4 flex justify-center items-center bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-105 focus:outline-none py-2 px-4"
						>
							{isLoading ? <Loading style1="border-white w-6 h-6" style2={"text-white"} text="Adding Product..." /> : "Submit"}
						</button>
					</div>
				</form>

			</div>
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

		</div>
	)
}

export default AddProduct;
