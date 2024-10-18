import mongoose from "mongoose"
import { MongoDatabase } from "./init"



describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(connected).toBeTruthy();
    })

    test('should return be an error if connection not found', async () => {
        const errorConfig = {
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: 'postgresql://postgres:nocredentials@localhost:5432/NOC-TEST'
        }

        await expect(MongoDatabase.connect(errorConfig))
            .rejects
            .toThrow(expect.any(Error))
    })

})


