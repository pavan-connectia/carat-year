import express from "express";
import {
  createDiscount,
  getAllDiscount,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  deleteManyDiscount,
  previewDiscount,
} from "../controllers/discountController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", getAllDiscount);
router.get("/:id", protect, getDiscountById);


router.post("/", protect, authorize(["SuperAdmin"]), createDiscount);
router.post("/preview", previewDiscount);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateDiscount);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyDiscount);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteDiscount);

export default router;
