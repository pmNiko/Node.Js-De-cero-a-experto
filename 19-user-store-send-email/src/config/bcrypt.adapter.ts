import { compareSync, genSaltSync, hashSync } from "bcryptjs";

// export const bcryptAdapter = {

//     hash: (password: string) => {
//         const salt = genSaltSync();
//         return hashSync(password, salt);
//     },

//     compare: (password: string, hashed: string ) => {
//         return compareSync(password, hashed);
//     }
// }

export class BcryptAdapter {
  constructor() {}

  public static hash = (password: string) => hashSync(password, genSaltSync());

  public static compare = (password: string, hashed: string) =>
    compareSync(password, hashed);
}
