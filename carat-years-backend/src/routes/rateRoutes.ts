import express from "express";
import {
  createRate,
  getRate,
  updateRates,
} from "../controllers/rateController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/",protect, authorize(["Admin", "SuperAdmin"]),  getRate);
router.post("/", protect, authorize(["SuperAdmin"]), createRate);
router.patch("/", protect, authorize(["SuperAdmin"]), updateRates);

export default router;
