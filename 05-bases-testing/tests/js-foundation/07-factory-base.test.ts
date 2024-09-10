import { buildMakePerson } from "../../src/js-fundation/07-applied-factory"


describe('Test on 05-factory-base', () => {
    // pseudo Mock de las fn 
    const getUUID = () => 1234;
    const getAge = () => 35;

    test('buildMakePerson should return a fn', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });

        expect(makePerson).toEqual(expect.any(Function));
        expect(typeof makePerson).toBe('function');
    })


    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        const jhonDoe = makePerson({ name: 'John Doe', birthdate: new Date().toLocaleDateString() })

        expect(jhonDoe).toBeDefined();
        expect(jhonDoe.name).toEqual('John Doe');
        expect(jhonDoe.age).toBeDefined();
        expect(jhonDoe.age).toEqual(expect.any(Number))
    })
})