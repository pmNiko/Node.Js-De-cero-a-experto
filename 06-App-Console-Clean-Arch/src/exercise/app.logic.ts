import { getTableof, persistTable, showTable } from "./libs";

const base = 9

const fiveTable = getTableof(base);

showTable(fiveTable)

persistTable(base, fiveTable);