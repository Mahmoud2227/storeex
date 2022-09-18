import express from "express";
import {addOrderItems, getOrderById} from "../controllers/order";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);

export default router;
