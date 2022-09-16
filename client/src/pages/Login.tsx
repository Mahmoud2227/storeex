import {useState, useEffect} from "react";
import {Link, useSearchParams,useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import { login } from "../store/slices/user/actions";
import Spinner from "../components/UI/Spinner";
import Message from "../components/UI/Message";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

  const dispatch = useAppDispatch();
  const {loading, error, user} = useAppSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(redirect || "/");
    }
  },[user, navigate, redirect]);
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className='self-center max-w-xl w-full'>
			<h1 className='text-3xl font-semibold tracking-wider mb-4'>SIGN IN</h1>
			{error && <Message color='red'>{error}</Message>}
      {loading && <Spinner />}
      <form onSubmit={submitHandler}>
				<div>
					<label htmlFor='email' className='font-medium'>
						Email Address
					</label>
					<input
						type='email'
						id='email'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='password' className='font-medium'>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='w-full mt-2 bg-slate-100 border border-gray-300 rounded-md p-2 placeholder:text-slate-400 focus:outline-slate-400'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit' className='py-3 px-5 bg-slate-700 text-white'>
					SIGN IN
				</button>
			</form>
			<p className="mt-4">
				New Customer?{" "}
				<Link
					to={redirect ? `/register?redirect=${redirect}` : "/register"}
					className='font-medium'>
					Register
				</Link>
			</p>
		</div>
	);
};

export default Login;
