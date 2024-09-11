export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export interface CreatgeTableUseCase {
    execute: (options: CreateTableOptions) => string;
}


export class CreateTable implements CreatgeTableUseCase {
    constructor(
        /**
         * DI - Dependency Injection
         */
    ) { }

    execute({ base, limit = 10 }: CreateTableOptions) {
        let outputmessage = `------ Tabla del ${base} -------\n\n`;
        for (let i = 0; i < limit; i++) {
            outputmessage += `${base} x ${i} = ${base + i}\n`;
        }

        return outputmessage;
    }

}