import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authServices = new AuthService();
    const controller = new AuthController(authServices);

    // Definir las rutas
    router.post("/login", controller.login);
    router.post("/register", controller.register);
    router.get("/validate-email/:email", controller.validateEmail);

    return router;
  }
}
