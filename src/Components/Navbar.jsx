import { useContext } from "react"
import { ContextProviderApp } from "../Context/ContextProvider"
import Search from "./Search";

const Navbar = () => {
	const { isAuth, setIsAuth, search, setSearch } = useContext(ContextProviderApp);
	return (
		<div className="py-2 px-4 flex justify-between items-center shadow-md mb-2">
			<img src="kg-non-bg.png" alt="logo" className="h-12 md:h-16" />
			<div className="flex gap-2 items-center">
				<div className="hidden md:flex justify-between items-center gap-2">
					<Search search={search} setSearch={setSearch} />
				</div>
				{isAuth && (
					<button
						className="bg-blue-600 text-white px-4 py-2 text-base md:px-6 md:py-2 md:text-lg rounded-md shadow-lg hover:bg-red-700 active:bg-red-800 transition-all duration-200 transform hover:scale-105 focus:outline-none"
						onClick={() => {
							setIsAuth(false);
							localStorage.removeItem("token");
							localStorage.removeItem("user");
						}}
					>
						Logout
					</button>
				)}
			</div>
		</div>
	)
}

export default Navbar
