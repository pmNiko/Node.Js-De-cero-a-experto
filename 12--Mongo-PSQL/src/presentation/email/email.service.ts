import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';


interface Attachment {
    filename: string;
    path: string;
}

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });


    constructor(
        // private readonly logRepository: LogRepository,
    ) { }


    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            // console.log(sentInformation)
            // const log = new LogEntity({
            //     level: LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin: 'email.service.ts'
            // });
            // this.logRepository.saveLog(log);

            return true
        } catch (error) {
            // const log = new LogEntity({
            //     level: LogSeverityLevel.high,
            //     message: 'Email not sent',
            //     origin: 'email.service.ts'
            // });
            // this.logRepository.saveLog(log);

            return false;
        }
    }


    async sendEmailWithFSLogs(to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
                <h3>Log de sistemas - NOC </h3>

                <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino</p>

                <p>Ver logs adjuntos</p>
            `;


        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}