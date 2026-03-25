import express from "express";
import { getHome, UpdateHome } from "../controllers/homeController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/",getHome);
router.put("/", protect, authorize(["Admin","SuperAdmin"]), UpdateHome);

export default router;