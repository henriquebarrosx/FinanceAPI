import express, { Express } from "express"
import { logger } from "../logger-adapter"
import { IHttpServer } from "./index.gateway"

export class ExpressAdapter implements IHttpServer {
    private app: Express

    constructor() {
        this.app = express()
        this.app.use(express.json())
    }

    init(): void {
        this.app.listen(process.env.PORT, () => {
            logger.info(`Server running at port ${process.env.PORT}`)
        })
    }
}