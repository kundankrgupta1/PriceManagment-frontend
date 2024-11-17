import { useContext, useState } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";
import { brands } from "../assets/data";

const BrandSelector = ({searchForBrand, setSearchForBrand}) => {

	const [filtered, setFiltered] = useState([]);
	const { setBrandName } = useContext(ContextProviderApp);

	const handleSearchChange = (e) => {
		const searchValue = e.target.value;
		setSearchForBrand(searchValue);
		if (searchValue) {
			const filtered = brands.filter((brand) => brand.toLowerCase().includes(searchValue.toLowerCase()));
			setFiltered(filtered.length > 0 ? filtered : ["Other"]);
		} else {
			setFiltered([]);
		}
	};

	const handleBrandClick = (brand) => {
		setBrandName(brand);
		setSearchForBrand(brand);
		setFiltered([]);
	};


	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Type to search brand"
				value={searchForBrand}
				onChange={handleSearchChange}
				className="border border-gray-300 w-full p-2 rounded-lg capitalize"
			/>
			{filtered.length > 0 && (
				<ul className="absolute rounded-lg m-0 list-none w-full z-10 bg-white p-1 overflow-y-auto overflow-x-hidden scrollbar-hide max-h-60"
					style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
				>
					{filtered.map((brand, index) => (
						<li
							key={index}
							onClick={() => handleBrandClick(brand)}
							className="border capitalize hover:bg-slate-300 py-2 my-1 cursor-pointer px-2 rounded-lg"
						>
							{brand}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BrandSelector