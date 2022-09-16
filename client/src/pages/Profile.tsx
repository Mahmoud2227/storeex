import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {getUserDetails, updateProfile} from "../store/slices/user/actions";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";

interface FormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Profile = () => {
	const [form, setForm] = useState<FormValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [message, setMessage] = useState<string>("");
	const [success, setSuccess] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const {loading, error, user} = useAppSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setForm({
					name: user.name,
					email: user.email,
					password: "",
					confirmPassword: "",
				});
			}
		}
	}, [user, dispatch, navigate]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			const updateUser = {
				_id: user?._id,
				name: form.name,
				email: form.email,
				password: form.password,
			};
			dispatch(updateProfile(updateUser));
			if (!error) {
				setSuccess(true);
			}
		}
	};

	return (
		<div className='flex gap-6'>
			<div className='self-center max-w-xs w-full'>
				<h1 className='text-3xl font-semibold tracking-wider mb-4'>REGISTER</h1>
				{message && <Message color='red'>{message}</Message>}
				{success && !loading && !error && <Message color='green'>Profile Updated</Message>}
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
						UPDATE
					</button>
				</form>
			</div>
			<div>
				<h1 className='text-3xl font-semibold tracking-wider'>MY ORDERS</h1>
			</div>
		</div>
	);
};

export default Profile;
