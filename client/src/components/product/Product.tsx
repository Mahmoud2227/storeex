import React from "react";
import {Link} from "react-router-dom";
import ProductType from "../../types/product";
import Rating from "../UI/Rating";

const Product: React.FC<{product: ProductType}> = ({product}) => {
	return (
		<div className='max-w-[350px] flex flex-col gap-4 h-full mx-auto p-4 rounded-xl border-2'>
			<Link to={`/product/${product._id}`}>
				<img src={product.image} alt={product.name} className='w-full object-cover rounded-xl' />
			</Link>
			<Link to={`/product/${product._id}`} className='flex-1 flex flex-col gap-2 py-2 px-4 '>
				<strong className='font-medium'>{product.name}</strong>
				<div className='flex-1' />
				<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				<p className='justify-self-end text-2xl font-semibold'>{product.price}</p>
			</Link>
		</div>
	);
};

export default Product;
