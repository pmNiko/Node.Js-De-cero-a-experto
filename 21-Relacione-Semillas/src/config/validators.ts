import mongoose from "mongoose";

export class Validators {
  constructor() {}

  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }
}
