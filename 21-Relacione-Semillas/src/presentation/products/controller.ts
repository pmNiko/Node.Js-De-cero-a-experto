import { Request, Response } from "express";
import { CreateProductDTO, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  public createProduct = (req: Request, res: Response) => {
    const [error, createProductDTO] = CreateProductDTO.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDTO!)
      .then((product) => res.status(201).json(product))
      .catch((err) => this.handlerError(err, res));
  };

  public getProduct = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      +page! || undefined,
      +limit! || undefined
    );
    if (error) return res.status(400).json({ error });

    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((err) => this.handlerError(err, res));
  };
}
