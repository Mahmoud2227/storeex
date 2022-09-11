import React from "react";
import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";

const Rating: React.FC<{value: number; text: string; className?: string}> = ({
	value,
	text,
	className,
}) => {
	return (
		<div className={`flex items-center gap-1 text-yellow-500 ${className ? className : ""}`}>
			<span>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{value === 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span className='ml-2 text-black'>{text && text}</span>
		</div>
	);
};

export default Rating;
