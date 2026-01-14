import express from "express";
import {
  createContactForm,
  getAllContactForm,
  getContactFormById,
  updateContactForm,
  deleteContactForm,
  deleteManyContactForm,
} from "../controllers/contactFormController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", protect, authorize(["Admin", "SuperAdmin"]), getAllContactForm);
router.get("/:id", protect, authorize(["Admin", "SuperAdmin"]), getContactFormById);
router.post("/", createContactForm);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateContactForm);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyContactForm);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteContactForm);

export default router;
