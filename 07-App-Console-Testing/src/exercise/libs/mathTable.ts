import { persistFile } from "../helpers";


export const getTableof = (base: number, limit = 10) => {
    const output = [];
    const header = `
    =======================================================
                        Tabla de ${base}
    =======================================================
    `
    output.push(header)

    for (let i = 0; i <= limit; i++) {
        const res = base * i
        output.push(`${base} x ${i} = ${res}`);
    }

    return output;
}

export const showTable = (table: string[]) => {
    for (const ele of table) console.log(ele)
}

export const persistTable = (base: number, table: string[]) => {
    // const base = parseInt(table.at(-1)?.split(' ').at(-1) as any) / 10
    persistFile('output', `table-${base}.txt`, table.join('\n'));
}