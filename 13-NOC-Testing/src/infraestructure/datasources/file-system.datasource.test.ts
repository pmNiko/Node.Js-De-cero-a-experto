import fs from "fs";
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { FileSystemDatasource } from "./file-system.datasource";

describe("FileSystemDatasource - Datasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => fs.rmSync(logPath, { recursive: true, force: true }));

  test("should create log files if they do not exists", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save logs in 'logs-all.log'", () => {
    const logdatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.tets.ts",
    });

    logdatasource.saveLog(log);
    const logs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(logs).toContain(JSON.stringify(log));
  });

  test("should save logs in 'logs-all.log' and 'logs-medium.log'", () => {
    const logdatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test medium",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.tets.ts",
    });

    logdatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save logs in 'logs-all.log' and 'logs-high.log'", () => {
    const logdatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test error",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.tets.ts",
    });

    logdatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logdatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: "test-low",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.tets.ts",
    });
    const logMedium = new LogEntity({
      message: "test-medium",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.tets.ts",
    });
    const logHigh = new LogEntity({
      message: "test error",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.tets.ts",
    });

    logdatasource.saveLog(logLow);
    logdatasource.saveLog(logMedium);
    logdatasource.saveLog(logHigh);

    const logsLow = await logdatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logdatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logdatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test("should not throw an error if path exists", () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    expect(true).toBeTruthy();
  });

  test("should return an empty array if not content logs", async () => {
    const logdatasource = new FileSystemDatasource();

    const logs = await logdatasource.getLogs(LogSeverityLevel.low);

    expect(logs).toEqual(expect.any(Array));
    expect(logs).toHaveLength(0);
  });

  test("should throw an error if LogSeverityLevel not implemented", async () => {
    const logdatasource = new FileSystemDatasource();
    const severityLevel = "Severity Level foo" as LogSeverityLevel;

    await expect(
      logdatasource.getLogs(severityLevel as LogSeverityLevel)
    ).rejects.toThrow(expect.any(Error));
    await expect(logdatasource.getLogs(severityLevel)).rejects.toEqual(
      Error("Severity Level foo not implemented")
    );
  });
});
