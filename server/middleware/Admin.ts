import {Request, Response, NextFunction} from "express";
import IUser from "../types/User";

interface RequestWithUser extends Request {
	user?: IUser;
}

const admin = (req: RequestWithUser, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

export default admin;