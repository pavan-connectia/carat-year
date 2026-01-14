import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadFile, removeFile,} from "../controllers/uploadController";
import { authorize } from "../middlewares/roleMiddleware";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = (req.query.folder as string) || "uploads";
    const uploadDir = path.join(__dirname, `../${folderPath}`);
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${baseName}${ext}`);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  protect,
  authorize(["SuperAdmin"]),
  upload.single("file"),
  uploadFile
);

router.delete("/remove", protect, authorize(["SuperAdmin"]), removeFile);

export default router;
