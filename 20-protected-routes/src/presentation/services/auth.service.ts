import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModal } from "../../data";
import {
  CustomError,
  LoginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existUser = await UserModal.findOne({ email: registerUserDTO.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModal(registerUserDTO);

      user.password = BcryptAdapter.hash(registerUserDTO.password);

      await user.save();

      // Email de confirmacion
      await this.sendEmailValidationLink(user.email);

      const { password, ...userProps } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: userProps.id });

      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: userProps,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDTO: LoginUserDTO) {
    const existUser = await UserModal.findOne({ email: loginUserDTO.email });

    if (!existUser)
      throw CustomError.notFound(`${loginUserDTO.email} not found`);

    try {
      const isMatching = BcryptAdapter.compare(
        loginUserDTO.password,
        existUser.password!
      );

      if (!isMatching) throw CustomError.forbiden("Not authorized!");

      const { password, ...userEntity } = UserEntity.fromObject(existUser);

      const token = await JwtAdapter.generateToken({ id: existUser.id });

      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICES_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email<h1/>
      <p>Click on the following link to validate your email<p/>
      <a href="${link}">Validate your email: ${email}<a/>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorize("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email no in token");

    const user = await UserModal.findOne({ email });
    if (!user) throw CustomError.internalServer("Email not exists");

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
