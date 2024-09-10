import { httpClientPlugin } from "../../src/plugins";

describe('Test on http-client.plugin', () => {
    const apiJsonPlacheholder = 'https://jsonplaceholder.typicode.com';

    test('should return a todo', async () => {

        const data = await httpClientPlugin.get(`${apiJsonPlacheholder}/todos/1`);

        expect(data).toBeDefined();
        expect(data).toEqual(expect.any(Object))
        expect(data).toEqual({
            userId: expect.any(Number),
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean)
        })
    })


    test('should method POST not implemented return exception', async () => {
        await expect(httpClientPlugin.post(`${apiJsonPlacheholder}/todos`, {})).rejects.toThrow('Not implemented');
    })

    test('should method PUT not implemented return exception', async () => {
        await expect(httpClientPlugin.put(`${apiJsonPlacheholder}/todos`, {})).rejects.toThrow('Not implemented');
    })

    test('should method DELETE not implemented return exception', async () => {
        await expect(httpClientPlugin.delete(`${apiJsonPlacheholder}/todos`, {})).rejects.toThrow('Not implemented');
    })
})