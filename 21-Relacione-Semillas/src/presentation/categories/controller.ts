import { Request, Response } from "express";
import { CreateCategoryDTO, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal Server Error" });
  };

  public createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDTO] = CreateCategoryDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDTO!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((err) => this.handlerError(err, res));
  };

  public getCategory = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      +page! || undefined,
      +limit! || undefined
    );

    if (error) return res.status(400).json({ error });

    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((err) => this.handlerError(err, res));
  };
}
