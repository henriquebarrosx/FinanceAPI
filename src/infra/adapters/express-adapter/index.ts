import { logger } from "../logger-adapter"
import express, { Express, Request, Response } from "express"

import { IHttpServer, IRequestType } from "./index.gateway"

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

    on(requestType: IRequestType, entrypoint: string, callback: Function): void {
        this.app[requestType](entrypoint, async (request: Request, response: Response) => {
            const output = await callback(request.params, request.body)
            response.status(output.status).json(output.data)
        })
    }
}