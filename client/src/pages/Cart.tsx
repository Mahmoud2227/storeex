import {useEffect} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {addProductToCart} from "../store/slices/cart";
import Message from "../components/UI/Message";

const Cart = () => {
	const {id} = useParams<{id: string}>();
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const qty = searchParams.get("qty") || 1;
	useEffect(() => {
		if (id) {
			dispatch(addProductToCart(id, +qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id: string) => {
		console.log(id);
	};
	return (
		<>
			<h1 className='text-3xl font-semibold mb-4'>Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<Message color='blue'>Your Cart Is Empty!</Message>
			) : (
				<div className='max-w-4xl'>
					{cartItems.map((item) => (
						<div key={item.product} className='grid grid-cols-12 p-4 border-b-2'>
							<div className='col-span-8 flex'>
								<div className='max-w-[80px]'>
									<img src={item.image} alt={item.name} className='rounded-xl' />
								</div>
								<h2 className='ml-4 font-medium'>
									<Link to={`/product/${item.product}`}>{item.name}</Link>
								</h2>
							</div>
							<p className='col-span-2 justify-between ml-4 font-medium'>
								{item.qty} x ${item.price}
							</p>
							<div className='col-span-2 flex justify-between '>
								<select
									className='w-fit h-fit px-6 py-2 bg-slate-100'
									name='qty'
									title='Qty select'
									value={item.qty}
									onChange={(e) => dispatch(addProductToCart(item.product, +e.target.value))}>
									{Array.from(Array(item.countInStock).keys()).map((x) => (
										<option key={x + 1} value={x + 1}>
											{x + 1}
										</option>
									))}
								</select>
								<span
									className='p-2 h-fit hover:bg-red-50 cursor-pointer'
									onClick={removeFromCartHandler.bind(null, item.product)}>
									<AiFillDelete className='text-2xl text-red-500' />
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Cart;
