import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFSLogs(to);

      if (!sent) {
        throw new Error("Could not send");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Log Email Sent",
        origin: "sent-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: "sent-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
