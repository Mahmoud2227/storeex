import React, {ReactNode} from "react";

const Message: React.FC<{color: string; children: ReactNode}> = ({color, children}) => {
	return (
		<p className={`max-w-3xl w-full bg-${color}-200 text-${color}-500 font-bold p-2`}>{children}</p>
	);
};

export default Message;
