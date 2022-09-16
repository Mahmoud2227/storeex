import {useState, useEffect} from "react";
import {Link, useSearchParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {register} from "../store/slices/user";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";

interface FormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register = () => {
	const [form, setForm] = useState<FormValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [message, setMessage] = useState<string>("");

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

	const dispatch = useAppDispatch();
	const {loading, error, user} = useAppSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(redirect || "/");
		}
	}, [user, navigate, redirect]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(form.name, form.email, form.password));
		}
	};

	return (
		<div className='self-center max-w-xl w-full'>
			<h1 className='text-3xl font-semibold tracking-wider mb-4'>REGISTER</h1>
			{message && <Message color='red'>{message}</Message>}
			{error && <Message color='red'>{error}</Message>}
			{loading && <Spinner />}
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='name' className='font-medium'>
						Full Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter Your Name'
						value={form.name}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='email' className='font-medium'>
						Email Address
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter email'
						value={form.email}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='password' className='font-medium'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter password'
						value={form.password}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='confirmPassword' className='font-medium'>
						Confirm Password
					</label>
					<input
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Confirm password'
						value={form.confirmPassword}
						onChange={onChangeHandler}
					/>
				</div>
				<button type='submit' className='py-3 px-5 bg-slate-700 text-white'>
					Register
				</button>
			</form>
			<p className='mt-4'>
				Have an Account?{" "}
				<Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className='font-medium'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
