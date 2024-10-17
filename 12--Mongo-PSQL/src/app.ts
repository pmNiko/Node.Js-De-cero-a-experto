import { envs } from "./config/plugins/env.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";



(
    async () => {
        await main();
    }
)()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });


    
    Server.start();
}



// Crear una coleccion = tablas documentos = registros
// const newLog = await LogModel.create({
    //     message: 'Test message from Mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // })
    
    // await newLog.save();
    // console.log({ newLog })
    
    // const logs = await LogModel.find();
    
    // console.log(logs)