import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("CheckService UseCase", () => {
  const mockLogRepository = { saveLog: jest.fn(), getLogs: jest.fn() };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
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

  test("should called callback mockLogRepository", async () => {
    await checkService.execute("https://google.com");

    expect(mockLogRepository.saveLog).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
