import { Request, Response } from "express";
import fs from "fs";
import path from "path";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadFile = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const folderPath = (req.query.folder as string) || "uploads";

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      filePath: `${folderPath}/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const folderPath = (req.query.folder as string) || "uploads";
    const filename = req.query.filename as string;

    if (!filename) {
      res.status(400).json({ success: false, message: "Filename is required" });
      return;
    }

    const filePath = path.join(__dirname, `../${folderPath}`, filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ success: false, message: "File not found" });
      return;
    }

    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: "File removed successfully",
      filePath: `${folderPath}/${filename}`,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};