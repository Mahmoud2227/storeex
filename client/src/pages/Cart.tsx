import {useEffect} from "react";
import {Link, useParams, useSearchParams,useNavigate} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {addProductToCart, removeProductFromCart} from "../store/slices/cart";
import Message from "../components/UI/Message";

const Cart = () => {
	const {id} = useParams<{id: string}>();
	const [searchParams] = useSearchParams();
	const qty = searchParams.get("qty") || 1;

	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	
	const navigate = useNavigate();
	
	useEffect(() => {
		if (id) {
			dispatch(addProductToCart(id, +qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id: string) => {
		dispatch(removeProductFromCart(id));
	};

	const onCheckoutHandler = () => {
		navigate("/login?redirect=shipping");
	};
	return (
		<>
			<h1 className='text-3xl font-semibold mb-4'>SHOPPING CART</h1>
			<div className='flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4'>
				{cartItems.length === 0 ? (
					<Message color='blue'>Your Cart Is Empty!</Message>
				) : (
					<div className='flex-1 max-w-5xl'>
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
				<div className='w-full max-w-lg lg:max-w-xs h-fit p-4 border-2'>
					<h2 className='text-2xl tracking-wide font-medium'>
						SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS
					</h2>
					<p className='font-medium my-4'>
						${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
					</p>
					<button
						type='button'
						className='w-full py-3 bg-slate-700 text-white font-medium tracking-wide disabled:bg-opacity-70 disabled:cursor-not-allowed'
						onClick={onCheckoutHandler}
						disabled={cartItems.length === 0}>
						Proceed To Checkout
					</button>
				</div>
			</div>
		</>
	);
};

export default Cart;
