import { CategoryModel } from "../../data";
import {
  CreateCategoryDTO,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDTO: CreateCategoryDTO, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDTO.name,
    });

    if (categoryExists) throw CustomError.badRequest("Category alredy exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDTO,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        categories: categories.map((cat) => ({
          name: cat.name,
          available: cat.available,
          user: cat.user,
        })),
      };
    } catch (error) {
      CustomError.internalServer();
    }
  }
}
