import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static start() {
        console.log('Server started...');

        const j = CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com';

                new CheckService(
                    fileSystemLogRepository
                    // , () => console.log(`Checking ${url} - services ok!`),
                    // (error) => console.log(error)
                ).execute(url)
            }
        );


    }
}


