import { envs } from "./env.plugins";



describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'nikolas090189@gmail.com',
            MAILER_SECRET_KEY: 'ubzikfbbfplxiqek',
            PROD: false,
            MONGO_URL: 'mongodb://nikodev:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'nikodev',
            MONGO_PASS: '123456'
        })
    })


    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        await expect(import('./env.plugins'))
            .rejects
            .toEqual(expect.any(Error))

        await expect(import('./env.plugins'))
            .rejects
            .toThrow('"PORT" should be a valid integer')

    })
})