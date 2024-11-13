import { useContext, useState } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";

const BrandSelector = () => {
	const brands = [
		"Anchor", "RR Kabel", "Luminous", "Bajaj", "Havells", "Legrand", "Polycab", "V-Guard", "Finolex", "KEI", "Syska", "Usha",
		"Crompton", "Orient", "Philips", "Schneider Electric", "Goldmedal", "GM Modular", "GreatWhite", "Voltas", "Standard Electricals", "Prestige", "Orpat", "Eveready", "Godrej", "Panasonic", "Livguard", "Exide", "summercool", "epravaat", "baltra", "Samsung", "LG", "Sony", "Panasonic", "Philips", "Haier", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo", "Motorola", "Apple", "Nokia", "Micromax", "Intex", "Lava", "Asus", "Acer", "HP", "Dell", "Lenovo", "Toshiba", "Canon", "Nikon", "Sharp", "JBL", "Bose", "Sennheiser", "Blaupunkt", "Vu", "Kodak", "Godrej Appliances", "IFB", "Videocon", "Hitachi", "Sansui", "Hisense", "TCL", "Thomson", "Mitsubishi Electric", "Electrolux", "Daikin", "Blue Star", "AmazonBasics", "Syska", "Harman", "Skullcandy", "Beetel", "Fujitsu", "BenQ", "ViewSonic", "TCL", "Mi (Xiaomi)", "BPL", "Bosch", "Siemens", "Pioneer", "Philco", "Onida", "Zebronics", "Portronics", "iBall India", "logitech", "Kingston", "Qunatum", "sandisk", "frontech", "noise", "boult", "boat", "firebolt", "fastrack"];

	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const { setBrandName } = useContext(ContextProviderApp);

	const handleSearchChange = (e) => {
		const searchValue = e.target.value;
		setSearch(searchValue);
		if (searchValue) {
			const filtered = brands.filter((brand) => brand.toLowerCase().includes(searchValue.toLowerCase()));
			setFiltered(filtered.length > 0 ? filtered : ["Other"]);
		} else {
			setFiltered([]);
		}
	};

	const handleBrandClick = (brand) => {
		setBrandName(brand);
		setSearch(brand);
		setFiltered([]);
	};


	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Type to search brand"
				value={search}
				onChange={handleSearchChange}
				className="border border-gray-300 w-full p-2 rounded-lg"
			/>
			{filtered.length > 0 && (
				<ul className="absolute m-0 list-none w-full bg-white overflow-y-auto overflow-x-hidden scrollbar-hide max-h-60">
					{filtered.map((brand, index) => (
						<li
							key={index}
							onClick={() => handleBrandClick(brand)}
							className="border hover:bg-slate-300 py-2 my-1 cursor-pointer px-2 rounded-lg"
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