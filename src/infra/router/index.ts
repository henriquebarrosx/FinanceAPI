import { JwtAdapter } from "#/infra/adapters/jwt-adapter"
import { MongoClientAdapter } from "#/infra/adapters/mongo-client-adapter"
import { IHttpServer } from "#/infra/adapters/express-adapter/index.gateway"

import { UsersRepository } from "#/infra/repositories/users-repository"
import { TransactionsRepository } from "#/infra/repositories/transactions-repository"

import { SignInUseCase } from "#/app/use-cases/session/sign-in"
import { CreateTransactionsUseCase } from "#/app/use-cases/transactions/create-transactions"
import { UpdateTransactionsUseCase } from "#/app/use-cases/transactions/update-transactions"
import { ListTransactionsByUserIdUseCase } from "#/app/use-cases/transactions/list-transactions"

const authentication = new JwtAdapter()
const connection = new MongoClientAdapter()

const usersRepository = new UsersRepository(connection)
const transactionsRepository = new TransactionsRepository(connection)

export class Router {
    constructor(private readonly httpServer: IHttpServer) { }

    init(): void {
        /* SESSION */

        this.httpServer.on("post", "/v1/sign-in/social", ({ body }) => {
            const signIn = new SignInUseCase(authentication, usersRepository)
            return signIn.execute(body)
        })

        /* TRANSACTIONS */

        this.httpServer.on("get", "/v1/transactions", ({ headers }) => {
            const sessionId = authentication.verify(headers.authorization)
            const listTransactions = new ListTransactionsByUserIdUseCase(transactionsRepository)
            return listTransactions.execute(sessionId)
        })

        this.httpServer.on("post", "/v1/transactions", ({ body, headers }) => {
            const sessionId = authentication.verify(headers.authorization)
            const createTransaction = new CreateTransactionsUseCase(transactionsRepository)
            return createTransaction.execute({ ...body, userId: sessionId })
        })

        this.httpServer.on("put", "/v1/transactions", ({ body, headers }) => {
            const sessionId = authentication.verify(headers.authorization)
            const updateTransactions = new UpdateTransactionsUseCase(transactionsRepository)
            return updateTransactions.execute({ ...body, userId: sessionId })
        })
    }
}