import { useContext, useState } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";

const CategorySelector = () => {
	const categories = ["home appliances", "electrical goods", "computer accessories", "lights", "fans", "mobiles", "tv", "soundbox", "wire", "pipes & fittings"]

	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const { setCategoryNameFiltered } = useContext(ContextProviderApp);

	const handleSearchChange = (e) => {
		const searchValue = e.target.value;
		setSearch(searchValue);
		if (searchValue) {
			const filtered = categories.filter((category) => category.toLowerCase().includes(searchValue.toLowerCase()));
			setFiltered(filtered.length > 0 ? filtered : ["Other"]);
		} else {
			setFiltered([]);
		}
	};

	const handleCategoryClick = (category) => {
		setCategoryNameFiltered(category);
		setSearch(category);
		setFiltered([]);
	};


	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Type to search Category..."
				value={search}
				onChange={handleSearchChange}
				className="border border-gray-300 w-full p-2 rounded-lg"
			/>
			{filtered.length > 0 && (
				<ul className="absolute m-0 list-none w-full bg-white overflow-y-auto overflow-x-hidden scrollbar-hide max-h-60 z-10">
					{filtered.map((category, index) => (
						<li
							key={index}
							onClick={() => handleCategoryClick(category)}
							className="border hover:bg-slate-300 py-2 my-1 cursor-pointer px-2 rounded-lg"
						>
							{category}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CategorySelector