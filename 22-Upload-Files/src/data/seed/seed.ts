import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModal,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    UserModal.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  const users = await UserModal.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((cat) => {
      return {
        ...cat,
        user: users.at(0)?._id,
      };
    })
  );

  const products = await ProductModel.insertMany(
    seedData.products.map((prod) => {
      return {
        ...prod,
        user: users[randomBetween0AndX(seedData.users.length - 1)]?._id,
        category:
          categories[randomBetween0AndX(seedData.categories.length - 1)]?._id,
      };
    })
  );
}
