import { useContext } from "react"
import { ContextProviderApp } from "../Context/ContextProvider"
import { IoMdClose } from "react-icons/io";

const Brand = () => {

	const { brand, setBrand, brandNames} = useContext(ContextProviderApp);

	return (
		<>
			{brandNames.length > 0 && (
				<div className="flex flex-col items-start">
					<div className="flex gap-8 items-center mb-2">
						<h1 className="font-bold text-gray-800">Products by Brand</h1>
						{brand && <button onClick={() => setBrand("")}
							className="flex items-center gap-1 text-white bg-red-600 px-2 py-1 text-xs rounded-sm shadow-lg hover:bg-red-700"
						>
							<IoMdClose size={16} />
							Clear Filter
						</button>}
					</div>
					<div className="flex flex-wrap gap-3">
						{brandNames?.map((brand, index) => {
							return (
								<button
									key={index}
									className="capitalize text-sm text-gray-800 bg-gray-200 px-4 py-1 rounded-sm transition-transform transform hover:scale-105 hover:bg-gray-300 active:bg-gray-400 active:scale-100"
									onClick={() => setBrand(brand)}
								>
									{brand}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</>

	)
}

export default Brand