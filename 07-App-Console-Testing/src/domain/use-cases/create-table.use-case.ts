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
        const output = [];

        for (let i = 1; i <= limit; i++) {
            const res = base * i
            output.push(`${base} x ${i} = ${res}`);
        }

        return output.join('\n');
    }

}