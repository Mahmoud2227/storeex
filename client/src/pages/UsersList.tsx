import {useEffect} from "react";
import {Link} from "react-router-dom";
import {FaCheck, FaTimes, FaTrash, FaEdit} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {getUsersList} from "../store/slices/usersList";
import Message from "../components/UI/Message";
import Spinner from "../components/UI/Spinner";

const UsersList = () => {
	const dispatch = useAppDispatch();
	const {usersList, loading, error} = useAppSelector((state) => state.usersList);

	useEffect(() => {
		dispatch(getUsersList());
	}, [dispatch]);

	const deleteHandler = (id: string) => {
		console.log(id);
	};

	return (
		<>
			<h1 className='text-3xl font-semibold'>Users</h1>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message color='red'>{error}</Message>
			) : (
				<table className='table-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2 border'>ID</th>
							<th className='px-4 py-2 border'>Name</th>
							<th className='px-4 py-2 border'>Email</th>
							<th className='px-4 py-2 border'>Admin</th>
							<th className='px-4 py-2 border'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{usersList?.map((user) => (
							<tr key={user._id} className='odd:bg-slate-100 hover:bg-slate-200'>
								<td className='border px-4 py-2'>{user._id}</td>
								<td className='border px-4 py-2'>{user.name}</td>
								<td className='border px-4 py-2'>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td className='border px-4 py-2'>
									{user.isAdmin ? (
										<FaCheck className='text-green-500' />
									) : (
										<FaTimes className='text-red-500' />
									)}
								</td>
								<td className='border px-4 py-2'>
									<Link to={`/admin/users/${user._id}/edit`}>
										<button className='bg-white font-bold py-2 px-4 rounded'>
											<FaEdit />
										</button>
									</Link>
									<button
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
										onClick={() => deleteHandler(user._id)}>
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default UsersList;
