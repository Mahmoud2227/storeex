import React from "react";

const Spinner = () => {
	return (
		<div className='flex-1 w-full flex justify-center items-center'>
			<span className='w-10 h-10 border-4 border-y-transparent border-x-slate-600 rounded-full animate-spin ' />
		</div>
	);
};

export default Spinner;
