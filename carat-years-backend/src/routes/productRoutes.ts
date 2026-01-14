import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
  getFilteredProducts,
  searchProducts,
  getProductByTag,
  createManyProducts,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", protect, authorize(["SuperAdmin"]), createProduct);
router.post("/bulk", createManyProducts);
router.get("/tag/:tag", getProductByTag);
router.get("/search", searchProducts);
router.get("/filter", getFilteredProducts);
router.get("/:slug", getProductById);
router.get("/", getAllProducts);
router.patch("/:id", protect, authorize(["SuperAdmin"]), updateProduct);
router.delete("/", protect, authorize(["SuperAdmin"]), deleteManyProduct);
router.delete("/:id", protect, authorize(["SuperAdmin"]), deleteProduct);

export default router;
