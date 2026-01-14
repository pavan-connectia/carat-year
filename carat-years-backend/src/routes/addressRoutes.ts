import express from "express";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getAddresses);
router.get("/:id", protect, getAddressById);
router.post("/", protect, createAddress);
router.patch("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;
