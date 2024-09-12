/** 
 * Preparamos nuestros args para el ambiente de pruebas
 * Añadimos los args params a los argv
 */
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('test args.plugin.ts', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5'])

        expect(argv).toEqual(expect.objectContaining(
            {
                b: 5,
                l: 10,
                s: false,
                p: false,
                n: 'table',
                d: './outputs'
            }
        ))
    })

    test('should return configuration with ', async () => {
        const destination = 'custom-dir';
        const args = ['-b', '3', '-l', '5', '-s', '-p', '-n', 'customName', '-d', destination]
        const argv = await runCommand(args)

        expect(argv).toEqual(expect.objectContaining(
            {
                b: 3,
                l: 5,
                s: true,
                p: true,
                n: 'customName',
                d: destination
            }
        ))
    })
})