import fs from "fs";
import { fileExists, removeDir } from "../../config/plugins/handlerFiles";
import { SaveFile } from "./save-file.use-case"


describe('Test on save-file.use-case.ts', () => {
    const fileContent = 'This is a test file content';
    const defaultDestination = 'outputs';
    const defaultFileName = 'table';


    afterEach(removeDir)

    test('should be instance of SaveFile', () => {
        const saveFile = new SaveFile();

        expect(saveFile).toBeInstanceOf(SaveFile);
    })

    test('should be return true if save is successfully', () => {
        const saveFile = new SaveFile();
        const result = saveFile.execute({ fileContent });

        expect(result).toBeTruthy()
    })

    test('should be save on custom destination', () => {
        const saveFile = new SaveFile();
        const customDestination = 'custm-dir'
        saveFile.execute({ fileContent, fileDestination: customDestination });

        const exists = fileExists(customDestination)

        expect(exists).toBeTruthy()

        removeDir(customDestination)
    })

    test('should be save on custom fileName', () => {
        const saveFile = new SaveFile();
        const customFileName = 'custm-file-name'
        saveFile.execute({ fileContent, fileName: customFileName });

        const exists = fileExists(`${defaultDestination}/${customFileName}.txt`);

        expect(exists).toBeTruthy()
    })

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        saveFile.execute({ fileContent });

        const fileDestinationExists = fileExists(defaultDestination);
        const fileNameExists = fileExists(`${defaultDestination}/${defaultFileName}.txt`);

        expect(fileDestinationExists).toBeTruthy();
        expect(fileNameExists).toBeTruthy();
    })

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
            .mockImplementation(() => { throw new Error('Directory could not be created') })
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = saveFile.execute({ fileContent });

        expect(result).toBeFalsy()
        expect(consoleErrorSpy).toHaveBeenCalled()

        mkdirSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    })

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync')
            .mockImplementation(() => { throw new Error('File could not be created') })
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = saveFile.execute({ fileContent });


        expect(result).toBeFalsy()
        expect(consoleErrorSpy).toHaveBeenCalled()

        writeFileSyncSpy.mockRestore()
        consoleErrorSpy.mockRestore();
    })
})