import { getAge } from '../../src/plugins'

describe('Test on get-age.plugin', () => {
    const today = new Date();

    test('should return difference date param and current date', () => {
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);

        const age = getAge(lastYear.toLocaleString());

        expect(age).toBe(1);
        expect(typeof age).toBe('number');
    })


    test('should return 0 years', () => {
        const years = getAge(today.toDateString())

        expect(years).toBe(0);
    })


    test('should return 0 years with spy', () => {
        // when called a getFullYear method returns 2000
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2000)

        const birthdate = '2000-10-10';

        const age = getAge(birthdate)

        expect(age).toBe(0)
    })
})