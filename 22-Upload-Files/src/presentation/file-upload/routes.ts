import { Router } from "express";
import { FileUploadMiddleware, TypeMiddleware } from "../middlewares";
import { FileUploadService } from "../services";
import { FileUploadController } from "./controller";

export class FileUploadRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(["users", "products", "categories"]));

    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.fileMultipleUpload);

    return router;
  }
}
