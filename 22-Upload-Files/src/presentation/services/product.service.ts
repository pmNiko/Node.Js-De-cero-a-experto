import { ProductModel } from "../../data";
import { CreateProductDTO, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDTO: CreateProductDTO) {
    const productExists = await ProductModel.findOne({
      name: createProductDTO.name,
    });

    if (productExists) throw CustomError.badRequest("Product alredy exists");

    try {
      const product = new ProductModel(createProductDTO);

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category", "name available"),
      ]);

      return {
        page,
        limit,
        total,
        prev:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        products,
      };
    } catch (error) {
      CustomError.internalServer();
    }
  }
}
