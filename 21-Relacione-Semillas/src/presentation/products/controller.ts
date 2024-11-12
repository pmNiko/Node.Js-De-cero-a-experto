import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";

export class ProductController {
  constructor() {} // private readonly productService: ProductService // TODO: Realizar

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  public createProduct = (req: Request, res: Response) => {
    // const [error, createCategoryDTO] = CreateCategoryDTO.create(req.body);
    // if (error) return res.status(400).json({ error });
    // this.categoryService
    //   .createCategory(createCategoryDTO!, req.body.user)
    //   .then((category) => res.status(201).json(category))
    //   .catch((err) => this.handlerError(err, res));
    return res.json("Create products");
  };

  public getProduct = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      +page! || undefined,
      +limit! || undefined
    );
    if (error) return res.status(400).json({ error });

    return res.json("Get products");

    // this.categoryService
    //   .getCategories(paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((err) => this.handlerError(err, res));
  };
}
