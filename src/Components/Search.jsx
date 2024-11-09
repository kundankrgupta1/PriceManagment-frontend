import { useContext, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RiCloseLargeFill } from "react-icons/ri";
import { ContextProviderApp } from '../Context/ContextProvider';

const Search = () => {
	const { search, setSearch } = useContext(ContextProviderApp);
	const [icon, setIcon] = useState(false)
	const handleSearchChange = (event) => {
		setSearch(event.target.value)
		if (search) {
			setIcon(true)
		}
	}

	const handleCloseIcon = () => {
		setSearch("")
		setIcon(false)
	}
	return (
		<div className="flex items-center bg-slate-200 rounded-full pl-4 pr-2 py-1 shadow-md">
			<input
				type="text"
				placeholder="Search products..."
				className="flex-grow bg-transparent outline-none px-2 text-gray-700 placeholder-gray-500"
				value={search}
				onChange={handleSearchChange}
			/>
			<button
				className={`${icon ? "bg-red-600" : "bg-blue-600"} text-white rounded-full p-2 ml-2 transition duration-200`}
			>
				{icon ? <RiCloseLargeFill size={20} onClick={handleCloseIcon} /> : <IoSearchOutline size={20} />}
			</button>
		</div>
	)
}

export default Search