import { existsSync, readFileSync, rmSync } from "fs"


export const fileExists = (path: string) => existsSync(path)

export const readFile = (path: string, options?: { encoding: 'utf8' }) =>
    readFileSync(path, options)

export const removeDir = (destination = 'outputs') => {
    try {
        if (existsSync(destination)) {
            rmSync(destination, { recursive: true })
        }
    } catch (error) {
        console.log(error);
    }
}
