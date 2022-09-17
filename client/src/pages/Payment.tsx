import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {savePaymentMethod} from "../store/slices/cart";

const Payment = () => {
	const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

	const dispatch = useAppDispatch();
	const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

	const navigate = useNavigate();

	if (!shippingAddress) {
		navigate("/shipping");
	}

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<div className='self-center max-w-xl w-full'>
			<CheckoutSteps step1 step2 step3 />
			<h1 className='text-3xl font-semibold tracking-wider mb-4'>Payment Method</h1>
			<form onSubmit={submitHandler}>
				<h2 className='text-lg font-medium text-slate-600'>Select Method</h2>
				<div className='flex items-center gap-4 my-2'>
					<input
						type='radio'
						id='paypal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='paypal' className='font-medium text-sm'>
						PayPal or Credit Card
					</label>
				</div>
				{/* <div className='flex items-center gap-4 my-2'>
					<input
						type='radio'
						id='stripe'
						name='paymentMethod'
						value='Stripe'
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<label htmlFor='stripe' className='font-medium text-sm'>
						Stripe
					</label>
				</div> */}
				<button
					type='submit'
					className='w-full py-2 mt-4 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50'>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Payment;
