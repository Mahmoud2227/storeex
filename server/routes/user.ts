import express from "express";
import {authUser, getUserProfile, registerUser} from "../controllers/user";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
