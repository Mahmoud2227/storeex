import express from "express";
import {authUser, getUserProfile} from "../controllers/user";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
