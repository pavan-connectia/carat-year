import { protect } from "../middlewares/authMiddleware";
import {
  registerUser,
  forgotPassword,
  resetPassword,
  profile,
  updateProfile,
  getUserById,
  getUsers,
  deleteUser,
  deleteManyUser,
  verifyUserOtp,
  resendEmailOtp,
  resendMobileOtp,
  deleteAccount,
  verifyEmailOtp,
  downloadUsersExcel,
  loginWithPassword,
  sendEmailLoginOtp,
  verifyEmailLoginOtp,
} from "../controllers/userController";
import express from "express";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/profile", protect, profile);
router.get("/download", protect, authorize(["Admin", "SuperAdmin"]), downloadUsersExcel);
router.get("/", protect, authorize(["Admin", "SuperAdmin"]), getUsers);
router.get("/:id", protect, authorize(["Admin", "SuperAdmin"]), getUserById);
router.post("/signup", registerUser);
router.post("/verify-otp", verifyUserOtp);
router.post("/resend-email-otp", resendEmailOtp);
router.post("/resend-mobile-otp", resendMobileOtp);
router.post("/login", loginWithPassword);
router.post("/login/email-otp", sendEmailLoginOtp);
router.post("/login/email-otp/verify", verifyEmailLoginOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmailOtp);
router.patch("/reset-password", resetPassword);
router.patch("/profile", protect, updateProfile);
router.delete("/me", protect, deleteAccount);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyUser);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteUser);

export default router;
