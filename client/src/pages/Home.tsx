import React from "react";
import Product from "../components/product/Product";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";

import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {fetchProducts} from "../store/slices/product";

const Home = () => {
	const {products, error, loading} = useAppSelector((state) => state.products);

	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);
	return (
		<>
			<h1 className='text-3xl font-semibold'>Latest Products</h1>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message text={error} />
			) : (
				<div className='grid grid-cols-12 gap-y-8 sm:gap-8 my-4'>
					{products.map((product) => (
						<div
							key={product._id}
							className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3'>
							<Product product={product} />
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Home;
