import path from "path";
import fs from "fs";
import multer, { StorageEngine } from "multer";
import { Request } from "express";

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const destPath = req.uploadPath; // Assuming req.uploadPath is defined

    if (!fs.existsSync(destPath)) {
      try {
        fs.mkdirSync(destPath, { recursive: true });
      } catch (error: any) {
        return cb(error, "");
      }
    }

    cb(null, destPath); // Directory to store the uploaded files
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const parts = file.originalname.split(".");
    const extension = parts[parts.length - 1];
    let fileName = file.fieldname + "-" + Date.now();

    if (extension === "png" || extension === "jpeg" || extension === "jpg") {
      fileName += "." + extension;
    }

    cb(null, fileName);
  },
});

// Create the multer upload instance
export const upload = multer({ storage });

// Define the type for uploaded files
export type UploadedFile = Express.Multer.File;
