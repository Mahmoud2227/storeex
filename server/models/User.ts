import mongoose from "mongoose";
import IUser from "../types/User";
import bycrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{timestamps: true}
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bycrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bycrypt.genSalt(10);
	this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
