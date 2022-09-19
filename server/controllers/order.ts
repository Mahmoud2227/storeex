import {Request} from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order";
import IUser from "../types/User";

interface RequestWithUser extends Request {
	user?: IUser & {_id: string};
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req: RequestWithUser, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			orderItems,
			user: req.user?._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

export const getOrderById = asyncHandler(async (req: RequestWithUser, res) => {
	const order = await Order.findById(req.params.id).populate("user", "name email");

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export const updateOrderToPaid = asyncHandler(async (req: RequestWithUser, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});