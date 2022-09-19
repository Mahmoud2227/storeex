import express from "express";
import {addOrderItems, getOrderById,updateOrderToPaid} from "../controllers/order";
import protect from "../middleware/Auth";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
