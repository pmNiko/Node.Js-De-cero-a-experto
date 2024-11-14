import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadController } from "./controller";

export class FileUploadRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController();

    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.fileMultipleUpload);

    return router;
  }
}
