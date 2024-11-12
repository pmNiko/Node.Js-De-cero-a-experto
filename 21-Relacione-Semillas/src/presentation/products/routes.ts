import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const controller = new ProductController();

    // Definicion de las rutas
    router.get("/", controller.getProduct);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
