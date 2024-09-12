import fs from "fs";

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {
        // repository: StorageRepository
    }

    execute({
        fileContent,
        fileName = 'table',
        fileDestination = 'outputs'
    }: Options): boolean {
        try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, 'utf8');
            return true;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }
}