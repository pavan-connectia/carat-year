import express from "express";
import {
  createFaq,
  getAllFaq,
  getFaqById,
  updateFaq,
  deleteFaq,
  deleteManyFaq,
} from "../controllers/faqController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", getAllFaq);
router.get("/:id", protect, authorize(["Admin", "SuperAdmin"]), getFaqById);
router.post("/", protect, authorize(["SuperAdmin"]), createFaq);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateFaq);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyFaq);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteFaq);

export default router;
