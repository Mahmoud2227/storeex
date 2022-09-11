import React from "react";
import {Link, useParams} from "react-router-dom";
import Rating from "../components/UI/Rating";
import products from "../DummyProducts";

const Product: React.FC = () => {
	const {id} = useParams<{id: string}>();
	const product = products.find((p) => p._id.toString() === id);
	return (
		<div>
			<Link to='/' className='block w-fit mb-4 p-4 font-medium hover:bg-slate-300'>
				GO BACK
			</Link>
			<div className="flex gap-16">
				<img src={product?.image} alt={product?.name} />
				<div>
					<h1 className="text-3xl font-bold py-8">{product?.name}</h1>
					<div>
						{product && <Rating value={product?.rating} text={`${product?.numReviews} reviews`} className='border-t-2 py-3' />}
            <p className="font-medium py-3 border-t-2">Price: {product?.price}</p>
            <p className="py-3 border-t-2">Description: {product?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
