import express from "express";
import {
  createNewsletterSub,
  getAllNewsletterSub,
  getNewsletterSubById,
  updateNewsletterSub,
  deleteNewsletterSub,
  deleteManyNewsletterSub,
  unsubscribeNewsletterSub,
  downloadNewsletterSubsExcel,
} from "../controllers/newsletterSubController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get(
  "/download",
  protect,
  authorize(["Admin", "SuperAdmin"]),
  downloadNewsletterSubsExcel
);
router.get("/", protect, authorize(["Admin", "SuperAdmin"]), getAllNewsletterSub);
router.get("/:id", protect, authorize(["Admin", "SuperAdmin"]), getNewsletterSubById);
router.post("/", createNewsletterSub);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateNewsletterSub);
router.delete("/unsubscribe", protect, unsubscribeNewsletterSub);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyNewsletterSub);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteNewsletterSub);

export default router;
