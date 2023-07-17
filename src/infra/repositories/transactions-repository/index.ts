import { logger } from "#/infra/adapters/logger-adapter"
import { ITransactionsRepository } from "./index.gateway"
import { Transaction } from "#/domain/entities/transaction"
import { localDateAdapter } from "#/infra/adapters/date-fns-adapter"
import { IConnection } from "#/infra/adapters/mongo-client-adapter/index.adapter"
import { LocalDateFormatEnum } from "#/infra/adapters/date-fns-adapter/index.gateway"

export class TransactionsRepository implements ITransactionsRepository {
    constructor(private readonly connection: IConnection) { }

    async create(transaction: Transaction): Promise<{ id: string }> {
        const database = await this.connection.start()
        const collection = database.collection("transactions")

        logger.info(`[transactions repository] creating transaction: ${JSON.stringify(transaction.toJSON())}`)

        const zonedTime = localDateAdapter.toZonedTime(transaction.date)
        const formatedDate = localDateAdapter.format(zonedTime, LocalDateFormatEnum.DATE)

        const { insertedId } = await collection
            .insertOne({
                userId: transaction.userId,
                date: formatedDate,
                isExpense: transaction.isExpense,
                value: transaction.value,
                description: transaction.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

        this.connection.end()
        return { id: insertedId.toString() }
    }

    async findAll(): Promise<Transaction[]> {
        throw new Error("Method not implemented.")
    }

    async findByUserId(userId: string): Promise<Transaction[]> {
        throw new Error("Method not implemented.")
    }
}