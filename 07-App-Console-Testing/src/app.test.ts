import { ServerApp } from "./presentation/server-app";



describe('Test on app.ts', () => {
    test('should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-dir'];

        await import('./app')

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            destination: 'test-dir',
            fileName: 'test-file'
        })
    })
})