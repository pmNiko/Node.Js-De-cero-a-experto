import mongoose from "mongoose";
import { envs } from "../../config/plugins/env.plugins";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("Test on MongoLogDatasource", () => {
  const logDatasource = new MongoLogDatasource();
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "test message",
    origin: "mongo-log.datasource.test.ts",
  });

  beforeAll(
    async () =>
      await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
      })
  );

  afterEach(async () => await LogModel.deleteMany());

  afterAll(() => mongoose.connection.close());

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");
    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Mongo log created:")
    );
  });

  test("should get logs", async () => {
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
