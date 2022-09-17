import express from "express";
import { addOrderItems } from "../controllers/order";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/", protect, addOrderItems);

export default router;
