import { getUserById } from "../../src/js-fundation/03-callbacks"


describe('Test on 03-callbacks', () => {
    test('should return an user by id if exist on array', () => {
        getUserById(1, (err, user) => {
            expect(user).toBeDefined();
        })
    })

    test('should return an error if user does not exist', () => {
        const userId = 3;
        getUserById(userId, (err, user) => {
            expect(user).toBeUndefined();
            expect(err).toBeDefined();
            expect(err).toBe(`User ${userId} not found`)
        })
    })
})