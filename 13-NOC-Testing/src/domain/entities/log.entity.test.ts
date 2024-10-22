import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
  const dataObj = {
    message: "Hello world",
    level: LogSeverityLevel.high,
    origin: "log.entity.test.ts",
  };

  test("should create a LogEntity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from json", () => {
    const json = `{"message":"https://googlesss.com is not ok. TypeError: fetch failed","level":"high","origin":"check-service.ts","createdAt":"2024-10-18T12:28:21.489Z"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(
      "https://googlesss.com is not ok. TypeError: fetch failed"
    );
    expect(log.level).toBe("high");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
