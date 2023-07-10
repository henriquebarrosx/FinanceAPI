import { logger } from "../logger-adapter"
import { IConnection } from "./index.adapter"
import { Db, MongoClient, ServerApiVersion } from "mongodb"

export class MongoClientAdapter implements IConnection {
    private readonly client: MongoClient

    constructor() {
        this.client = new MongoClient(process.env.DATABASE_URL!, {
            serverApi: {
                strict: true,
                deprecationErrors: true,
                version: ServerApiVersion.v1,
            }
        })
    }

    async start(): Promise<Db> {
        logger.info("[database] Connecting database...")
        await this.client.connect()
        return this.client.db(process.env.DATABASE)
    }

    end() {
        this.client.close()
        logger.info("[database] database connection end")
    }
}