import { useContext, useState } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";
import { categories } from "../assets/data";

const CategorySelector = ({ searchForCategory, setSearchForCategory }) => {

	const [filtered, setFiltered] = useState([]);
	const { setCategoryNameFiltered } = useContext(ContextProviderApp);

	const handleSearchChange = (e) => {
		const searchValue = e.target.value;
		setSearchForCategory(searchValue);
		if (searchValue) {
			const filtered = categories.filter((category) => category.toLowerCase().includes(searchValue.toLowerCase()));
			setFiltered(filtered.length > 0 ? filtered : ["Other"]);
		} else {
			setFiltered([]);
		}
	};

	const handleCategoryClick = (category) => {
		setCategoryNameFiltered(category);
		setSearchForCategory(category);
		setFiltered([]);
	};


	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Type to search Category..."
				value={searchForCategory}
				onChange={handleSearchChange}
				className="border border-gray-300 w-full p-2 rounded-lg capitalize"
			/>
			{filtered.length > 0 && (
				<ul className="absolute rounded-lg m-0 list-none w-full bg-white overflow-y-auto overflow-x-hidden scrollbar-hide max-h-60 z-10 p-1"
					style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
				>
					{filtered.map((category, index) => (
						<li
							key={index}
							onClick={() => handleCategoryClick(category)}
							className="border capitalize hover:bg-slate-300 py-2 my-1 cursor-pointer px-2 rounded-lg"
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