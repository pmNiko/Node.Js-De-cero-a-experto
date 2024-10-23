import nodemailer from "nodemailer";
import { EmailService, SendEmailOptions } from "./email.service";

describe("EmailService - service", () => {
  const mockSendMail = jest.fn();

  // Mock al createTranspport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  beforeEach(() => jest.clearAllMocks());

  test("should first", async () => {
    const emailService = new EmailService();

    const options: SendEmailOptions = {
      to: "nikolas@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test Info</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test Info</h1>",
      subject: "Test",
      to: "nikolas@gmail.com",
    });
  });

  test("should send email with attachements", async () => {
    const emailService = new EmailService();
    const email = "nikolas@gmail.com";
    await emailService.sendEmailWithFSLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      ]),
    });
  });
});
