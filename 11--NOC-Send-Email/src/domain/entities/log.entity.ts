

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

/**
 * Al definir nuestras entidades nos aseguramos 
 * la información que fluirá a través de nuestra app
 */

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson(json: string): LogEntity {
        const { level, message, createdAt, origin } = JSON.parse(json);

        return new LogEntity({
            level,
            message,
            origin,
            createdAt
        });
    }

}