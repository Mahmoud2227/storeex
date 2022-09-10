import React from "react";
import {Link} from "react-router-dom";
import {HiShoppingCart, HiUser} from "react-icons/hi";

const Header = () => {
	return (
		<header className='w-full p-6 bg-slate-800'>
			<nav className='container mx-auto flex justify-between items-center'>
				<Link to='/' className='text-slate-100 text-xl font-semibold'>
					Storeex
				</Link>
				<ul className='flex items-center gap-6 font-medium text-slate-400 text-sm'>
					<li className='hover:text-slate-100'>
						<Link to='/cart'  className="flex gap-1 items-center">
							<HiShoppingCart />
							CART
						</Link>
					</li>
					<li className='hover:text-slate-100 flex'>
						<Link to='/login' className="flex gap-1 items-center"><HiUser/>SIGN IN</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
