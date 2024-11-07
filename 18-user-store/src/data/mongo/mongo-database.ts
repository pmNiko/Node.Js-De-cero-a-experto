import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor() {}

  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      console.log("Mongo Connected");

      return true;
    } catch (error) {
      console.log("Mongo connection error");
      throw error;
    }
  }
}
