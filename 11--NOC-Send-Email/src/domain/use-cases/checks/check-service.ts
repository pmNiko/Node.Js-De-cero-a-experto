import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceuseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceuseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })
            this.logRepository.saveLog(log)

            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${error} to check service ${url}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });

            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(errorMessage)

            return false;
        }
    }

}