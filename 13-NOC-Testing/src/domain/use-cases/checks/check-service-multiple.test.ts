import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockLogRepository1 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockLogRepository2 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockLogRepository3 = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockLogRepository1, mockLogRepository2, mockLogRepository3],
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => jest.clearAllMocks());

  test("should call successCallback when fetch returns true", async () => {
    const response = await checkService.execute("https://google.com");

    expect(response).toBeTruthy();
  });

  test("should called callback mockSuccessCallback", async () => {
    await checkService.execute("https://google.com");

    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
  });

  test("should called callback mockErrorCallback", async () => {
    await checkService.execute("https://doesNotExists.com");

    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockSuccessCallback).not.toHaveBeenCalled();
  });

  test("should called callback mockLogRepositories", async () => {
    await checkService.execute("https://google.com");

    expect(mockLogRepository1.saveLog).toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalled();
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalled();
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
