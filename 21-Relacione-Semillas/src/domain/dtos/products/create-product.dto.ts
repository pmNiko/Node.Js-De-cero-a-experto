import { Validators } from "../../../config";

export class CreateProductDTO {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: string,
    public readonly description: string,
    public readonly user: string, // ID
    public readonly category: string //ID
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDTO?] {
    const { name, available, price, description, user, category } = props;

    if (!name) return ["Missing name"];

    if (!user) return ["Missing user"];
    if (!Validators.isMongoID(user)) return ["Invalid user ID"];

    if (!category) return ["Missing category"];
    if (!Validators.isMongoID(category)) return ["Invalid category ID"];

    return [
      undefined,
      new CreateProductDTO(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
