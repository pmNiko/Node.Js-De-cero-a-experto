import fs from "fs";


export const persistFile = (outputPath: string, fileTitle: string, content: string) => {
    try {
        fs.writeFileSync(`${outputPath}/${fileTitle}`, content, 'utf8');
        console.log('File has been written successfully.');
    } catch (error: any) {
        if (error.message.includes('no such file or directory')) {
            console.log('Directory does not exist, creating...')
            fs.mkdirSync(outputPath, { recursive: true });
            fs.writeFileSync(`${outputPath}/${fileTitle}`, content, 'utf8');
            console.log('File has been written successfully.');
        }
    }
} 