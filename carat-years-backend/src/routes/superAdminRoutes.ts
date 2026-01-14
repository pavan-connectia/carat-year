import { protect } from "../middlewares/authMiddleware";
import {
  loginSuperAdmin,
  registerSuperAdmin,
  forgotPassword,
  resetPassword,
  profile,
  updateProfile,
  deleteSuperAdmin,
  getSuperAdminById,
  getSuperAdmin,
  updateSuperAdminById,
  deleteManySuperAdmin,
} from "../controllers/superAdminController";
import express from "express";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", protect, authorize(["SuperAdmin"]), getSuperAdmin);
router.get("/profile", protect, profile);
router.get("/:id", protect, authorize(["SuperAdmin"]), getSuperAdminById);
router.post("/signup", registerSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);
router.patch("/profile", protect, updateProfile);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateSuperAdminById);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManySuperAdmin);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteSuperAdmin);

export default router;
