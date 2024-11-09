import { Link } from "react-router-dom";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";

const ProductCard = ({ _id, product_image, product, brand, category, single_price, box_qty, box_price, createdAt }) => {
	return (
		<Link to={`/product/${_id}`}>
			<div className="bg-white rounded-md overflow-hidden"
				style={{
					boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
				}}
			>
				<img
					src={product_image}
					alt={product}
					className="my-2 w-full h-36 md:h-48 object-contain"
				/>
				
				<div className="p-4">
					<p className="text-xs font-semibold text-gray-500 md:text-lg md:line-clamp-none md:overflow-visible md:h-auto overflow-hidden text-ellipsis h-9">
						{product}
					</p>
					<h1 className="text-2xl leading-[0.2rem] font-bold my-4">
						{single_price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
						<span className="text-sm text-gray-500"> Single Price</span>
					</h1>
					<p className="text-gray-600">Box Qty: {box_qty} - Box Price: {box_price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>

					<div className="flex items-center mt-4 gap-4 flex-wrap">
						<div className="flex items-center gap-1 capitalize">
							<HiOutlineBuildingOffice2 className="w-5 h-5" />
							<span>{brand}</span>
						</div>
						<div className="flex items-center gap-1 capitalize">
							<AiFillProduct className="w-5 h-5" />
							<span>{category}</span>
						</div>
					</div>
				</div>
				{createdAt && <div className="bg-gray-200 text-gray-500 text-sm px-2 py-1 flex items-center gap-2">
					{new Date(createdAt).toLocaleString('en-US', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						hour12: true
					})}
				</div>}
			</div>
		</Link>
	);
}

export default ProductCard;
