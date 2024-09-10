import { getUUID } from "../../src/plugins"


describe('Test on get-id.plugin', () => {
    test('should return ID', () => {
        const id = getUUID();

        expect(id).toBeTruthy();
        expect(id).toEqual(expect.any(String));
        expect(id).toHaveLength(36)
    })
})