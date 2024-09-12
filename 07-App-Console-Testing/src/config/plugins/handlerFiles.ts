import { existsSync, readFileSync, rmSync } from "fs"


export const fileExists = (path: string) => {
    try {
        return existsSync(path)
    } catch (error) {
        console.log(error)
    }
}

export const readFile = (path: string, options?: { encoding: 'utf8' }) => {
    try {
        readFileSync(path, options)
    } catch (error) {
        console.log(error)
    }
}

export const removeDir = (destination = 'outputs') => {
    try {
        if (existsSync(destination)) {
            rmSync(destination, { recursive: true })
        }
    } catch (error) {
        console.log(error);
    }
}
