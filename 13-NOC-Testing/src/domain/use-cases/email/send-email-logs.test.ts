import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("SendEmailLogs UseCase", () => {
  const mockEmailService = {
    sendEmailWithFSLogs: jest.fn().mockReturnValue(true),
  };
  const mockLogRepository = { saveLog: jest.fn(), getLogs: jest.fn() };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => jest.clearAllMocks());

  test("should be an instance of SendEmail", async () => {
    expect(sendEmailLogs).toBeInstanceOf(SendEmailLogs);
  });

  test("should return true when send email successfuly", async () => {
    const result = await sendEmailLogs.execute("email@example.com");

    expect(result).toBeTruthy();
  });

  test("should called mockEmailService one time", async () => {
    await sendEmailLogs.execute("email@example.com");

    expect(mockEmailService.sendEmailWithFSLogs).toHaveBeenCalledTimes(1);
  });

  test("should called mockLogRepository with LogEntity", async () => {
    await sendEmailLogs.execute("email@example.com");

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test("should called mockLogRepository with data LogEntity", async () => {
    await sendEmailLogs.execute("email@example.com");

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.low,
      message: expect.any(String),
      origin: expect.any(String),
    });
  });

  test("should log in case error", async () => {
    mockEmailService.sendEmailWithFSLogs.mockReturnValue(false);

    const result = await sendEmailLogs.execute("email@example.com");

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFSLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: expect.any(String),
      origin: expect.any(String),
    });
  });
});
