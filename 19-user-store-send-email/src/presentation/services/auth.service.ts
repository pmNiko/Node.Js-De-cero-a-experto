import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModal } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDTO: RegisterUserDto) {
    const existUser = await UserModal.findOne({ email: registerUserDTO.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModal(registerUserDTO);

      user.password = BcryptAdapter.hash(registerUserDTO.password);

      await user.save();

      const { password, ...userProps } = UserEntity.fromObject(user);

      return {
        user: userProps,
        token: "ABC",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDTO: LoginUserDto) {
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
}
