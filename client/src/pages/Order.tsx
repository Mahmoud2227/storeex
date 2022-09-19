import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {getOrderDetails} from "../store/slices/orderDetails";
import {payOrder, orderPayReset} from "../store/slices/orderPay";

const Order = () => {
	const [clientId, setClientId] = useState("");

	const dispatch = useAppDispatch();
	const {order, error, loading} = useAppSelector((state) => state.orderDetails);
	const {success: successPay, loading: loadingPay} = useAppSelector((state) => state.orderPay);

	const {id} = useParams();

	useEffect(() => {
		dispatch(getOrderDetails(id || ""));
	}, [dispatch, id]);

	useEffect(() => {
		const addPayPalScript = async () => {
			const res = await fetch("/api/config/paypal");
			const clientId = await res.text();
			console.log(clientId);
			setClientId(clientId);
		};

		if (successPay) {
			dispatch(getOrderDetails(id || ""));
			dispatch(orderPayReset());
		} else if (!order?.isPaid) {
			// @ts-ignore
			if (!window.paypal) {
				addPayPalScript();
			}
		}
	}, [dispatch, id, successPay, order]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message color='red'>{error}</Message>
			) : (
				<>
					<h1 className='text-3xl font-semibold px-4'>Order {order?._id}</h1>
					<div className='flex gap-4'>
						<div className='basis-2/3'>
							<div className='p-4 border-b-2'>
								<h2 className='text-2xl font-semibold'>SHIPPING</h2>
								<p className='text-sm mt-4'>
									<strong>Name:</strong> {order?.user?.name}
								</p>
								<p className='text-sm mt-4'>
									<a href={`mailto:${order?.user?.email}`}>
										<strong>Email:</strong> {order?.user?.email}
									</a>
								</p>
								<p className='text-sm my-4'>
									<strong>Address:</strong> {order?.shippingAddress.address},{" "}
									{order?.shippingAddress.city} {order?.shippingAddress?.postalCode},{" "}
									{order?.shippingAddress.country}
								</p>
								{order?.isDelivered ? (
									<Message color='green'>Delivered on {order?.deliveredAt}</Message>
								) : (
									<Message color='red'>Not Delivered</Message>
								)}
							</div>
							<div className='p-4 border-b-2'>
								<h2 className='text-2xl font-semibold'>PAYMENT METHOD</h2>
								<p className='text-sm my-4'>Method: {order?.paymentMethod}</p>
								{order?.isPaid ? (
									<Message color='green'>Paid on {order?.paidAt}</Message>
								) : (
									<Message color='red'>Not Paid</Message>
								)}
							</div>
							<div className='p-4'>
								<h2 className='text-2xl font-semibold'>ORDER ITEMS</h2>
								<ul className='mt-4 '>
									{order?.orderItems.map((item) => (
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
							<h2 className='text-2xl font-semibold px-4'>ORDER SUMMARY</h2>
							<ul className='mt-8 border-t-2'>
								<li className='grid grid-cols-6 p-4 border-b-2'>
									<p className='col-span-4'>Items</p>
									<p className='col-span-2'>
										${order?.orderItems.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}
									</p>
								</li>
								<li className='grid grid-cols-6 p-4 border-b-2'>
									<p className='col-span-4'>Shipping</p>
									<p className='col-span-2'>${order?.shippingPrice}</p>
								</li>
								<li className='grid grid-cols-6 p-4 border-b-2'>
									<p className='col-span-4'>Tax</p>
									<p className='col-span-2'>${order?.taxPrice}</p>
								</li>
								<li className='grid grid-cols-6 p-4'>
									<p className='col-span-4'>Total</p>
									<p className='col-span-2'>${order?.totalPrice}</p>
								</li>
							</ul>
							{!order?.isPaid && (
								<div className='m-8 mb-0'>
									{loadingPay && <Spinner />}
									{clientId ? (
										<PayPalScriptProvider
											options={{
												"client-id": clientId,
											}}>
											<PayPalButtons
												createOrder={(_data, actions) => {
													return actions.order.create({
														purchase_units: [
															{
																description: "Order",
																amount: {
																	value: order?.totalPrice.toString()!,
																},
															},
														],
													});
												}}
												onApprove={async (_data, actions) => {
													const details = await actions.order?.capture();
													dispatch(payOrder(id || "", details));
												}}
											/>
										</PayPalScriptProvider>
									) : (
										<Spinner />
									)}
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Order;
