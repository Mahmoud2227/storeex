import React from "react";

const Message: React.FC<{text: string}> = ({text}) => {
	return <p className='bg-red-200 text-red-500 font-bold p-2'>{text}</p>;
};

export default Message;
