import express from "express";
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
} from "../controllers/user";
import protect from "../middleware/Auth";
import admin from "../middleware/Admin";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
