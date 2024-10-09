import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

    public static start() {
        console.log('Server started...');

        const j = CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com';

                new CheckService(
                    () => console.log(`Checking ${url} - services ok!`),
                    (error) => console.log(error)
                ).execute(url)
            }
        );


    }
}


