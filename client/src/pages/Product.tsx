import React from "react";
import {Link, useParams} from "react-router-dom";
import Rating from "../components/UI/Rating";

import ProductType from "../types/product";

const Product: React.FC = () => {
	const [product, setProduct] = React.useState<ProductType | null>(null);
	const {id} = useParams<{id: string}>();

	React.useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`/api/products/${id}`);
			const data = await response.json();
			setProduct(data);
		};
		fetchProduct();
	}, [id]);

	return (
		<>
			<Link to='/' className='block w-fit mb-4 p-4 font-medium hover:bg-slate-300'>
				GO BACK
			</Link>
			{product && (
				<div className='flex justify-center gap-8 flex-wrap'>
					<div className='min-w-[250px] flex-1'>
						<img src={product?.image} alt={product?.name} />
					</div>
					<div className='flex-1 min-w-[300px]'>
						<h1 className='text-3xl font-bold py-8'>{product?.name}</h1>
						<div>
							<Rating
								value={product?.rating}
								text={`${product?.numReviews} reviews`}
								className='border-t-2 py-3'
							/>
							<p className='font-medium py-3 border-t-2'>Price: {product?.price}</p>
							<p className='py-3 border-t-2'>Description: {product?.description}</p>
						</div>
					</div>
					<div className='flex-1 min-w-[250px] max-w-sm h-fit border-2'>
						<p className='p-3 border-b-2'>Price: {product?.price}</p>
						<p className='p-3 border-b-2'>
							Status: {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
						</p>
						<button
							type='button'
							className='w-[calc(100%-24px)] p-3 m-3 text-white bg-slate-700 disabled:bg-opacity-70 disabled:cursor-not-allowed'
							disabled={product.countInStock === 0}>
							Add to Cart
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Product;
