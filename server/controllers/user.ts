import {Request} from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import User from "../models/User";
import IUser from "../types/User";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	const user = await User.findOne({email});

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id.toString()),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

interface RequestWithUser extends Request {
	user?: IUser & {_id: string};
}

export const getUserProfile = asyncHandler(async (req: RequestWithUser, res) => {
	const user = await User.findById(req.user?._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});
