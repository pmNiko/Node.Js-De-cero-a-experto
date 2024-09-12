import { CreateTable } from "./create-table.use-case"

describe('Test on create-table-use-case.ts', () => {
    const base = 5;
    const limit = 10;
    const table = new CreateTable().execute({ base });

    test('should be a string table', () => {
        expect(typeof table).toBe('string')
        expect(table).toEqual(expect.any(String))
    })

    test('should be contain a base table', () => {
        expect(table).toContain(base.toString())
    })

    test('should limit es optional', () => {
        expect(table).toBeDefined()
    })

    test('should be instance of CreateTable', () => {
        const createTable = new CreateTable();

        expect(createTable).toBeInstanceOf(CreateTable);
    })

    test('should be create table with limit like as default value', () => {
        const rows = table.split('\n').length;

        expect(rows).toBe(10)
    })

    test('should be contains table of base', () => {
        expect(table).toContain(`${base} x 1 = ${base}`)
        expect(table).toContain(`${base} x ${limit} = ${base * limit}`)
    })

    test('should be rows length equals to limit', () => {
        const rows = table.split('\n');

        expect(rows).toHaveLength(limit)
    })
})