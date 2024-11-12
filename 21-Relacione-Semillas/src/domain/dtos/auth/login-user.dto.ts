import { regularExps } from "../../../config";

export class LoginUserDTO {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password } = object;

    const passwordStr = `${password}`;

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email not valid"];
    if (!password) return ["Missing password"];
    if (passwordStr.length < 6) return ["Password to short"];

    return [undefined, new LoginUserDTO(email, passwordStr)];
  }
}
