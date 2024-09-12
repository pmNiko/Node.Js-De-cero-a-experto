import { removeDir } from "../config/plugins/handlerFiles";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app"


describe('Test on server-app', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        fileName: 'test-fileName'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should create Server Instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(ServerApp.run).toEqual(expect.any(Function));
        expect(typeof ServerApp.run).toBe('function');
    })


    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenLastCalledWith('File created successfully');

        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        })

        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.fileName
        })

        removeDir(options.destination)
    })


    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErroMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn();

        console.log = logMock;
        console.error = logErroMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(logErroMock).toHaveBeenCalledWith('File not created successfully');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.destination,
            fileName: options.fileName
        })
    })



})