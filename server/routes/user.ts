import express from "express";
import {authUser, getUserProfile, registerUser,updateUserProfile} from "../controllers/user";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
