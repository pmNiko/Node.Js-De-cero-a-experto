import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl - repository", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

  afterEach(() => jest.clearAllMocks());

  test("should call the datasource with args when saveLog", () => {
    const log = new LogEntity({
      message: "some message",
      level: LogSeverityLevel.low,
      origin: "log.repository.test.ts",
    });

    logRepositoryImpl.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalled();
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("should call the datasource with args when getLogs", () => {
    logRepositoryImpl.getLogs(LogSeverityLevel.low);

    expect(mockLogDatasource.getLogs).toHaveBeenCalled();
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.low
    );
  });
});
