import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fsDatasource = new FileSystemDatasource()
const mongooseDatasource = new MongoLogDatasource()
const psqlDatasource = new PostgresDatasource()


const url = "https://google.com";


const fsLogRepository = new LogRepositoryImpl(fsDatasource)
const mongoLogRepository = new LogRepositoryImpl(mongooseDatasource)
const psqlLogRepository = new LogRepositoryImpl(psqlDatasource)

const logRepository = [fsLogRepository, mongoLogRepository, psqlLogRepository]


export class Server {

    public static async start() {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    logRepository,
                    () => console.log(`\nChecking ${url} - services ok!`),
                    (error) => console.log(error)
                ).execute(url)
            }
        )
    }
}

