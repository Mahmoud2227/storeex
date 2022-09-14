import React from "react";
import {Link, useParams} from "react-router-dom";
import Rating from "../components/UI/Rating";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {fetchProductDetails} from "../store/slices/productDetails";

const Product: React.FC = () => {
	const {id} = useParams<{id: string}>();
	const {error, loading, productDetails} = useAppSelector((state) => state.productDetails);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(fetchProductDetails(id!));
	}, [dispatch, id]);

	return (
		<>
			<Link to='/' className='block w-fit mb-4 p-4 font-medium hover:bg-slate-300'>
				GO BACK
			</Link>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message text={error} />
			) : (
				<div className='flex justify-center gap-8 flex-wrap'>
					<div className='min-w-[250px] flex-1'>
						<img src={productDetails?.image} alt={productDetails?.name} />
					</div>
					<div className='flex-1 min-w-[300px]'>
						<h1 className='text-3xl font-bold py-8'>{productDetails?.name}</h1>
						<div>
							<Rating
								value={productDetails?.rating!}
								text={`${productDetails?.numReviews} reviews`}
								className='border-t-2 py-3'
							/>
							<p className='font-medium py-3 border-t-2'>Price: {productDetails?.price}</p>
							<p className='py-3 border-t-2'>Description: {productDetails?.description}</p>
						</div>
					</div>
					<div className='flex-1 min-w-[250px] max-w-sm h-fit border-2'>
						<p className='p-3 border-b-2'>Price: {productDetails?.price}</p>
						<p className='p-3 border-b-2'>
							Status: {productDetails?.countInStock! > 0 ? "In Stock" : "Out of Stock"}
						</p>
						<button
							type='button'
							className='w-[calc(100%-24px)] p-3 m-3 text-white bg-slate-700 disabled:bg-opacity-70 disabled:cursor-not-allowed'
							disabled={productDetails?.countInStock === 0}>
							Add to Cart
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Product;
