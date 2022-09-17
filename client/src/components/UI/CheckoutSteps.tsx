import {FC} from "react";
import {Link} from "react-router-dom";

const CheckoutSteps: FC<{
	step1?: boolean;
	step2?: boolean;
	step3?: boolean;
	step4?: boolean;
}> = ({step1, step2, step3, step4}) => {
	return (
		<ul className='flex justify-between items-center px-4 font-medium mb-8'>
			<li>
				{step1 ? (
					<Link to='/login' className='text-slate-500 hover:text-slate-900'>
						Sign In
					</Link>
				) : (
					<span className='text-slate-300'>Sign In</span>
				)}
			</li>
			<li>
				{step2 ? (
					<Link to='/shipping' className='text-slate-500 hover:text-slate-900'>
						Shipping
					</Link>
				) : (
					<span className='text-slate-300'>Shipping</span>
				)}
			</li>
			<li>
				{step3 ? (
					<Link to='/payment' className='text-slate-500 hover:text-slate-900'>
						Payment
					</Link>
				) : (
					<span className='text-slate-300'>Payment</span>
				)}
			</li>
			<li>
				{step4 ? (
					<Link to='/placeorder' className='text-slate-500 hover:text-slate-900'>
						Place Order
					</Link>
				) : (
					<span className='text-slate-300'>Place Order</span>
				)}
			</li>
		</ul>
	);
};

export default CheckoutSteps;
