import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were selected" });
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file].at(0) as UploadedFile;
    } else {
      req.body.files = req.files.file as UploadedFile[];
    }

    next();
  }
}
