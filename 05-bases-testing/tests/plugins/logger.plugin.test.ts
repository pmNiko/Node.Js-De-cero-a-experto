import { buildLogger, logger as winstonLogger } from "../../src/plugins"


describe('Test on logger.plugin', () => {

    test('buildLogger should return a function logger', () => {
        const logger = buildLogger('test');

        expect(typeof logger.log).toBe('function')
        expect(logger.error).toEqual(expect.any(Function))
    })


    test('logger.log should a message', () => {
        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');
        const message = 'test message';
        const service = 'test service0';

        const logger = buildLogger(service);

        logger.log(message)

        expect(winstonLoggerMock).toHaveBeenCalled()
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service
            })
        )

    })
})