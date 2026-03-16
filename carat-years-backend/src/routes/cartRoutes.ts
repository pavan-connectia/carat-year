import express from "express";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart,
  applyDiscount,
  removeDiscount,
  syncCart,
} from "../controllers/cartController";
import {protect, resolveUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(resolveUser, getCart).get(resolveUser, getCart);
router.post("/add", resolveUser, addToCart);
router.post("/sync", protect, syncCart);
router.post("/discount", resolveUser, applyDiscount);
router.put("/update", resolveUser, updateCartItem);
router.delete("/remove", resolveUser, removeFromCart);
router.delete("/clear", resolveUser, clearCart);
router.delete("/discount", resolveUser, removeDiscount);

export default router;
