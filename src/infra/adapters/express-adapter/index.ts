import { logger } from "../logger-adapter"
import express, { Express, Request, Response } from "express"
import { HttpRequestCallbackType, IHttpServer, IRequestType } from "./index.gateway"

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

    on(requestType: IRequestType, entrypoint: string, callback: HttpRequestCallbackType): void {
        this.app[requestType](entrypoint, async (request: Request, response: Response) => {
            try {
                const { headers, body, params } = request
                const output = await callback({ headers, body, params })
                response.status(output.status).send(output.data)
                return
            }

            catch (exception: any) {
                if (exception?.code && exception?.message) {
                    logger.error(`[ Error ${exception.code} ] - ${exception.message}`)
                    response.status(exception.code).send({ message: exception.message })
                    return
                }

                logger.error(`[ Error 500 ] - Internal Server Error: ${exception?.message}`)
                response.status(500).send({ message: "Internal Server Error" })
                return
            }
        })
    }
}