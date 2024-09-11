import { yarg as argvs } from "../config/plugins/args.plugin";
import { getTableof, persistTable, showTable } from "./libs";


(async () => {
    await main();
})()


async function main() {
    console.log(argvs)

    const table = getTableof(argvs.b, argvs.l);

    argvs.s && showTable(table);

    argvs.p && persistTable(argvs.b, table);
}

