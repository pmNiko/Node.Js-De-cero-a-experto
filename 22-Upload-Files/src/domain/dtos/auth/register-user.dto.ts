import { regularExps } from "../../../config";

export class RegisterUserDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password to short"];

    return [undefined, new RegisterUserDTO(name, email, password)];
  }
}
