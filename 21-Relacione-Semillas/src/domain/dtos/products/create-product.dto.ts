export class CreateProductDTO {
  private constructor(
    private readonly name: string,
    private readonly available: boolean,
    private readonly price: string,
    private readonly description: string,
    private readonly user: string, // ID
    private readonly category: string //ID
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDTO?] {
    const { name, available, price, description, user, category } = props;

    if (!name) return ["Missing name"];
    if (!user) return ["Missing user"];
    if (!category) return ["Missing category"];

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
