import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import {
  createOrder,
  deleteManyOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  getOrderStats,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, authorize(["Admin", "SuperAdmin"]), getAllOrders);
router.get(
  "/stats",
  protect,
  authorize(["Admin", "SuperAdmin"]),
  getOrderStats
);
router.post("/", protect, createOrder);
router.get("/:id", protect, authorize(["Admin", "SuperAdmin"]), getOrderById);
router.patch("/:id", protect, authorize(["Admin", "SuperAdmin"]), updateOrder);
router.delete("/", protect, authorize(["Admin", "SuperAdmin"]), deleteManyOrder);
router.delete("/:id", protect, authorize(["Admin", "SuperAdmin"]), deleteOrder);

export default router;
