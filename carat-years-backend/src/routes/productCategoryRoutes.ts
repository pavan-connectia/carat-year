import express from "express";
import {
  createProductCategory,
  getAllProductCategory,
  getProductCategoryById,
  updateProductCategory,
  deleteManyProductCategory,
  deleteProductCategory,
} from "../controllers/productCategoryController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", protect, authorize(["SuperAdmin"]), createProductCategory);
router.get("/", getAllProductCategory);
router.get("/:id", getProductCategoryById);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateProductCategory);
router.delete(
  "/",
  protect,
  authorize(["SuperAdmin"]),
  deleteManyProductCategory
);
router.delete(
  "/:id",
  protect,
  authorize(["SuperAdmin"]),
  deleteProductCategory
);

export default router;
