import React from "react";
import Product from "../components/product/Product";
import ProductType from "../types/product";

const Home = () => {
	const [products, setProducts] = React.useState<ProductType[]>([]);

	React.useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("/api/products");
			const data = await response.json();
			setProducts(data);
		};
		fetchProducts();
	}, []);
	return (
		<>
			<h1 className='text-3xl font-semibold'>Latest Products</h1>
			<div className='grid grid-cols-12 gap-y-8 sm:gap-8 my-4'>
				{products.map((product) => (
					<div key={product._id} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3'>
						<Product product={product} />
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
