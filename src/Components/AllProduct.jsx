
import { useContext } from "react";
import { ContextProviderApp } from "../Context/ContextProvider";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

const AllProduct = ({ loading }) => {
	const { allProduct } = useContext(ContextProviderApp);

	return (
		<div>
			{loading ? (
				<div className="flex justify-center items-center min-h-[50vh]">
					<Loading style1="border-blue-600 w-16 h-16" style2="text-gray-500 font-bold text-xl" text="Loading Please wait..." />
				</div>
			) : (
				<>
					{allProduct.length > 0 ? (
						<div className={`grid ${allProduct.length === 1 ? "grid-cols-1" : "grid-cols-2"} sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 my-4`}>
							{allProduct.map((e, index) => (
								<ProductCard key={index} {...e} />
							))}
						</div>
					) : (
						<div className="mt-8 flex flex-col items-center justify-center">
							<img src="./not_found_nobg.png" className="w-1/2 md:w-1/6" alt="No Products Found" />
							<h1 className="text-2xl text-red-600 font-extrabold">No Products Found!</h1>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AllProduct;
