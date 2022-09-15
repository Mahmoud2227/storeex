import {Request, Response, NextFunction} from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, {JwtPayload} from "jsonwebtoken";
import User from "../models/User";
import IUser from "../types/User";

interface TokenPayload extends JwtPayload {
	id: string;
}

interface RequestWithUser extends Request {
	user?: IUser;
}

const protect = expressAsyncHandler(
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			try {
				token = req.headers.authorization.split(" ")[1];
				const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
				req.user = (await User.findById(decoded.id).select("-password")) as IUser;
				next();
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error("Not authorized, token failed");
			}
		}

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, no token");
		}
	}
);

export default protect;
