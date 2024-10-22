import mongoose from "mongoose";
import { envs } from "../../config/plugins/env.plugins";
import { MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("Test on MongoLogDatasource", () => {
  beforeAll(
    async () =>
      await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
      })
  );

  afterAll(() => mongoose.connection.close());

  test("should create a log", async () => {
    const logDatasource = new MongoLogDatasource();
    const logSpy = jest.spyOn(console, "log");

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test message",
      origin: "mongo-log.datasource.test.ts",
    });

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo log created: ",
      expect.any(String)
    );
  });
});
