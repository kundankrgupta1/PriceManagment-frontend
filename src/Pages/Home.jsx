import { useContext, useEffect, useState } from "react"
import AddProduct from "../Components/AddProduct"
import AllProduct from "../Components/AllProduct"
import Brand from "../Components/Brand"
import Category from "../Components/Category"
import Navbar from "../Components/Navbar"
import Search from "../Components/Search"
import { ContextProviderApp } from "../Context/ContextProvider"
import axios from "axios"
import Loading from "../Components/Loading"

const Home = () => {
	const { openAddForm, setOpenAddForm, setAllProduct, setCategoryName } = useContext(ContextProviderApp);
	const { search, category, brand, setBrandNames } = useContext(ContextProviderApp);
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("token");
	let user = localStorage.getItem("user");
	user = JSON.parse(user);

	const fetchDataForCategory = async () => {
		const token = localStorage.getItem("token")
		try {
			const res = await axios.get(`https://pricemanagment-backend.onrender.com/category`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
			setCategoryName(res.data.categories)
		} catch (error) {
			console.log(error)
		}
	}
	const fetchDataForBrand = async () => {
		const token = localStorage.getItem("token")
		try {
			const res = await axios.get(`https://pricemanagment-backend.onrender.com/brand`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
			setBrandNames(res.data.brands)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`https://pricemanagment-backend.onrender.com/all?q=${search}&category=${category}&brand=${brand}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setAllProduct(res.data.products);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDataForBrand();
		fetchDataForCategory();
		const delay = setTimeout(() => {
			fetchData();
		}, 1000);
		return () => clearTimeout(delay);
	}, [search, category, brand]);

	return (
		<div>
			<Navbar />
			<div className="px-4">
				<div className="md:hidden">
					<Search />
				</div>
				<div className="my-4 flex items-center justify-between">
					<h1 className="pl-1 text-xl md:text-3xl font-bold capitalize">Welcome {user ? user.name.split(" ")[0] : "User"}!</h1>
					<button onClick={() => setOpenAddForm(!openAddForm)}
						className="bg-blue-600 text-white px-4 py-2 text-lg md:text-xl rounded-md shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-105 focus:outline-none"
					>Add Product</button>
				</div>
				<Brand />
				<Category />
				<AddProduct fetchData={fetchData} fetchDataForBrand={fetchDataForBrand} fetchDataForCategory={fetchDataForCategory} />
				<AllProduct loading={loading} />
				<Loading />
			</div>
		</div>
	)
}

export default Home;