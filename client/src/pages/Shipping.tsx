import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {saveShippingAddress} from "../store/slices/cart";

const Shipping = () => {
	const dispatch = useAppDispatch();
	const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

	const [form, setForm] = useState({
		address: shippingAddress?.address || "",
		city: shippingAddress?.city || "",
		postalCode: shippingAddress?.postalCode || "",
		country: shippingAddress?.country || "",
	});

	const navigate = useNavigate();

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(saveShippingAddress(form));
		navigate("/payment");
	};

	return (
		<div className='self-center max-w-xl w-full'>
			<CheckoutSteps step1 step2 />
			<h1 className='text-3xl font-semibold tracking-wider mb-4'>Shipping</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='address' className='font-medium'>
						Address
					</label>
					<input
						type='text'
						id='address'
						name='address'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter Your Address'
						value={form.address}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='city' className='font-medium'>
						City
					</label>
					<input
						type='text'
						id='city'
						name='city'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter Your City'
						value={form.city}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='postalCode' className='font-medium'>
						Postal Code
					</label>
					<input
						type='text'
						id='postalCode'
						name='postalCode'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter Your Postal Code'
						value={form.postalCode}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='country' className='font-medium'>
						Country
					</label>
					<input
						type='text'
						id='country'
						name='country'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter Your Country'
						value={form.country}
						onChange={onChangeHandler}
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 mt-4 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50'>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Shipping;
