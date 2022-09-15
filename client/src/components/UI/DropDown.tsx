import React from "react";
import {Link} from "react-router-dom";

const DropDown: React.FC<{name: string; Logout: () => void}> = ({name, Logout}) => {
	const [open, setOpen] = React.useState<boolean>(false);

	const logoutHandler = () => {
		Logout();
		setOpen(false);
	};
	return (
		<>
			<span
				className={`relative flex items-center after:inline-block after:ml-2 after:border-4 after:border-transparent
        hover:text-slate-100 hover:after:border-t-slate-100 after:translate-y-1 cursor-pointer ${
					open
						? "after:border-t-slate-100 text-slate-100"
						: "after:border-t-slate-400 text-slate-400"
				}`}
				onClick={() => setOpen(!open)}>
				{name}
				{open && (
					<ul className='absolute -bottom-20 left-0 w-[120%] text-black bg-white border-2 shadow-md'>
						<Link to='/profile' onClick={() => setOpen(false)}>
							<li className='p-2 hover:bg-slate-100'>Profile</li>
						</Link>
						<Link to='/' onClick={logoutHandler}>
							<li className='p-2 hover:bg-slate-100'>Logout</li>
						</Link>
					</ul>
				)}
			</span>
		</>
	);
};

export default DropDown;
