import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsDatasource = new FileSystemDatasource()

const fsLogRepository = new LogRepositoryImpl(fsDatasource)

const service = new CheckService(fsLogRepository);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...');

        // ?? Aca se hace el envio de email a travez de un caso de uso
        // new SendEmailLogs(
        //     emailService,       // servicio
        //     fsLogRepository     // repositorioImpl
        // ).execute(
        //     'nikodevfromar@gmail.com'
        // );
        // const emailService = new EmailService(fsLogRepository);
        // emailService.sendEmailWithFSLogs([
        //     'nikodevfromar@gmail.com',
        // ]);


        // new CheckService(
        //     fileSystemLogRepository
        //     // , () => console.log(`Checking ${url} - services ok!`),
        //     // (error) => console.log(error)
        // ).execute(url)

        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'nikodevfromar@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //         <h3>Log de sistemas - NOC </h3>

        //         <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino</p>

        //         <p>Ver logs adjuntos</p>
        //     `
        // })
    }
}

