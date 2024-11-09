import { useContext} from "react"
import { ContextProviderApp } from "../Context/ContextProvider"
import { IoMdClose } from "react-icons/io"

const Category = () => {
	
	const { category, setCategory, categoryName } = useContext(ContextProviderApp);
	
	return (
		<>
			{categoryName.length > 0 && (
				<div className="flex flex-col items-start my-6">
					<div className="flex gap-8 items-center mb-4">
						<h1 className="font-bold text-gray-800">Products by Category</h1>
						{category && <button onClick={() => setCategory("")}
							className="flex items-center gap-1 text-white bg-red-600 px-2 py-1 text-xs rounded-sm shadow-lg hover:bg-red-700"
						>
							<IoMdClose size={16} />
							Clear Filter
						</button>}
					</div>
					<div className="flex flex-wrap gap-3">
						{categoryName?.map((category, index) => {
							return (
								<button
									key={index}
									className="capitalize text-gray-800 bg-gray-200 px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-300 active:bg-gray-400 active:scale-100 shadow-md"
									onClick={() => setCategory(category)}
								>
									{category}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</>

	)
}

export default Category