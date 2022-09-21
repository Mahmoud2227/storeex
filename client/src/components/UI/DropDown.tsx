import React from "react";
import {Link} from "react-router-dom";

type DropDownItems = {
	name: string;
	link: string;
	func?: () => void;
};

const DropDown: React.FC<{dropDownItems: DropDownItems[]; title: string}> = ({
	dropDownItems,
	title,
}) => {
	const [open, setOpen] = React.useState<boolean>(false);

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
				{title}
				{open && (
					<ul className='absolute top-7 left-0 w-[120%] min-w-[90px] text-black bg-white border-2 shadow-md'>
						{dropDownItems.map((item) => (
							<Link
								to={item.link}
								key={item.name}
								onClick={() => {
									if (item.func) {
										item.func();
									}
									setOpen(false);
								}}>
								<li className='p-2 hover:bg-slate-100'>{item.name}</li>
							</Link>
						))}
					</ul>
				)}
			</span>
		</>
	);
};

export default DropDown;
