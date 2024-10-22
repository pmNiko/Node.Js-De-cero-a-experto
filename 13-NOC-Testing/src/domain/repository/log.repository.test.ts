import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";

describe("log.repository.test LogRepository", () => {
  const newLog = new LogEntity({
    origin: "log.respository.test.ts",
    message: "test message",
    level: LogSeverityLevel.low,
  });

  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class ", async () => {
    const mockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(mockLogRepository).toHaveProperty("saveLog");
    expect(mockLogRepository).toHaveProperty("getLogs");
    expect(typeof mockLogRepository.saveLog).toBe("function");
    expect(typeof mockLogRepository.getLogs).toBe("function");
  });

  test("should test properties abstract class", async () => {
    const mockLogRepository = new MockLogRepository();
    await mockLogRepository.saveLog(newLog);

    const logs = await mockLogRepository.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
