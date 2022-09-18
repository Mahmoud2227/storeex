import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import Message from "../components/UI/Message";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {calculatePrices} from "../store/slices/cart";
import {createOrder} from "../store/slices/order";
const PlaceOrder = () => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector((state) => state.cart);
	const {order, error, success} = useAppSelector((state) => state.order);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(calculatePrices());
		if (success) {
			navigate(`/orders/${order?._id}`);
		}
	}, [dispatch, success, navigate, order]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress!,
				paymentMethod: cart.paymentMethod!,
				shippingPrice: cart.orderPrice?.shippingPrice!,
				taxPrice: cart.orderPrice?.taxPrice!,
				totalPrice: cart.orderPrice?.totalPrice!,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className='flex gap-4'>
				<div className='basis-2/3'>
					<div className='p-4 border-b-2'>
						<h2 className='text-3xl font-semibold'>SHIPPING</h2>
						<p className='text-sm mt-4'>
							Address:{cart.shippingAddress?.address}, {cart.shippingAddress?.city}{" "}
							{cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
						</p>
					</div>
					<div className='p-4 border-b-2'>
						<h2 className='text-3xl font-semibold'>PAYMENT METHOD</h2>
						<p className='text-sm mt-4'>Method: {cart.paymentMethod}</p>
					</div>
					<div className='p-4'>
						<h2 className='text-3xl font-semibold'>ORDER ITEMS</h2>
						<ul className='mt-4 '>
							{cart.cartItems.map((item) => (
								<li
									key={item.product}
									className='grid grid-cols-6 p-4 border-b-2 last-of-type:border-none'>
									<div className='col-span-4 flex items-center gap-4'>
										<img src={item.image} alt={item.name} className='w-10 rounded-lg' />
										<p>{item.name}</p>
									</div>
									<p className='col-span-2'>
										{item.qty} x ${item.price} = ${item.qty * item.price}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='h-fit py-4 border-2 basis-1/3'>
					<h2 className='text-3xl font-semibold px-4'>ORDER SUMMARY</h2>
					<ul className='mt-8 border-t-2'>
						<li className='grid grid-cols-6 p-4 border-b-2'>
							<p className='col-span-4'>Items</p>
							<p className='col-span-2'>${cart.orderPrice?.itemsPrice}</p>
						</li>
						<li className='grid grid-cols-6 p-4 border-b-2'>
							<p className='col-span-4'>Shipping</p>
							<p className='col-span-2'>${cart.orderPrice?.shippingPrice}</p>
						</li>
						<li className='grid grid-cols-6 p-4 border-b-2'>
							<p className='col-span-4'>Tax</p>
							<p className='col-span-2'>${cart.orderPrice?.taxPrice}</p>
						</li>
						<li className='grid grid-cols-6 p-4 border-b-2'>
							<p className='col-span-4'>Total</p>
							<p className='col-span-2'>${cart.orderPrice?.totalPrice}</p>
						</li>
					</ul>
					{error && <Message color='red'>{error}</Message>}
					<button
						type='button'
						className='block w-[calc(100%_-_32px)] mt-4 mx-auto p-4 bg-slate-700 text-white'
						onClick={placeOrderHandler}>
						PLACE ORDER
					</button>
				</div>
			</div>
		</>
	);
};

export default PlaceOrder;
