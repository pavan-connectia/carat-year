import express from "express";
import {
  createTestimonials,
  getAllTestimonials,
  getTestimonialsById,
  updateTestimonials,
  deleteTestimonials,
  deleteManyTestimonials,
} from "../controllers/testimonialsController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", getAllTestimonials);
router.get("/:id", protect, getTestimonialsById);
router.post("/", protect, authorize(["SuperAdmin"]), createTestimonials);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateTestimonials);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyTestimonials);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteTestimonials);

export default router;
