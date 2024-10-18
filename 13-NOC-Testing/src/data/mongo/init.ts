import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase {
    static async connect(options: ConnectionOptions): Promise<boolean> {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });
            // console.log('Mongo database connection established.')
            return true;
        } catch (error) {
            throw error;
        }
    }
}