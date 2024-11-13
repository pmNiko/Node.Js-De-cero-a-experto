import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services";

export class ProductRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    const productServices = new ProductService();
    const controller = new ProductController(productServices);

    // Definicion de las rutas
    router.get("/", controller.getProduct);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
