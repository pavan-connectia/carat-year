import express from "express";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart,
  applyDiscount,
  removeDiscount,
} from "../controllers/cartController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/discount", protect, applyDiscount);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeFromCart);
router.delete("/clear", protect, clearCart);
router.delete("/discount", protect, removeDiscount);

export default router;
