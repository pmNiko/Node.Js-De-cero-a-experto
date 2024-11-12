import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError, LoginUserDTO, RegisterUserDTO } from "../../domain";

export class AuthController {
  constructor(public readonly authServices: AuthService) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  register = (req: Request, res: Response) => {
    const [error, registerDTO] = RegisterUserDTO.create(req.body);

    if (error) return res.status(400).json(error);

    this.authServices
      .registerUser(registerDTO!)
      .then((data) => res.json(data))
      .catch((err) => this.handlerError(err, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginDTO] = LoginUserDTO.create(req.body);

    if (error) return res.status(400).json(error);

    this.authServices
      .loginUser(loginDTO!)
      .then((data) => res.json(data))
      .catch((err) => this.handlerError(err, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authServices
      .validateEmail(token)
      .then(() => res.json("Email validated"))
      .catch((err) => this.handlerError(err, res));
  };
}
