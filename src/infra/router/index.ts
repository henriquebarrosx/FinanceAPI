import { IHttpServer } from "#/infra/adapters/express-adapter/index.gateway"
import { createTransactions } from "#/app/use-cases/transactions/create-transactions"
import { listTransactionsUseCase } from "#/app/use-cases/transactions/list-transactions"

export class Router {
    constructor(private readonly httpServer: IHttpServer) { }

    init(): void {
        this.httpServer.on("post", "/v1/transactions", createTransactions.execute)
        this.httpServer.on("get", "/v1/transactions", listTransactionsUseCase.execute)
    }
}