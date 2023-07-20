import { ObjectId } from "mongodb"
import { logger } from "#/infra/adapters/logger-adapter"
import { ITransactionsRepository } from "./index.gateway"
import { Transaction } from "#/domain/entities/transaction"
import { TransactionModel } from "#/domain/models/transaction"
import { localDateAdapter } from "#/infra/adapters/date-fns-adapter"
import { IConnection } from "#/infra/adapters/mongo-client-adapter/index.adapter"
import { LocalDateFormatEnum } from "#/infra/adapters/date-fns-adapter/index.gateway"

export class TransactionsRepository implements ITransactionsRepository {
    constructor(private readonly connection: IConnection) { }

    async create(transaction: Transaction): Promise<{ id: string }> {
        const database = await this.connection.start()
        const transactions = database.collection("transactions")

        logger.info(`[transactions repository] creating transaction: ${JSON.stringify(transaction.toJSON())}`)

        const zonedTime = localDateAdapter.toZonedTime(transaction.date)
        const formatedDate = localDateAdapter.format(zonedTime, LocalDateFormatEnum.DATE)

        const { insertedId } = await transactions
            .insertOne({
                userId: transaction.userId,
                date: formatedDate,
                isExpense: transaction.isExpense,
                value: transaction.value,
                description: transaction.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

        await this.connection.end()
        return { id: insertedId.toString() }
    }

    async update(transaction: Transaction): Promise<void> {
        const database = await this.connection.start()
        const transactions = database.collection("transactions")

        logger.info(`[transactions repository] updating transaction: ${JSON.stringify(transaction.toJSON())}`)

        const zonedTime = localDateAdapter.toZonedTime(transaction.date)
        const formatedDate = localDateAdapter.format(zonedTime, LocalDateFormatEnum.DATE)

        await transactions
            .updateOne(
                { _id: new ObjectId(transaction.id) },
                {
                    $set: {
                        date: formatedDate,
                        isExpense: transaction.isExpense,
                        value: transaction.value,
                        description: transaction.description,
                        updatedAt: new Date().toISOString(),
                    }
                }
            )

        await this.connection.end()
        return
    }

    async findByUserId(userId: string): Promise<Transaction[]> {
        const database = await this.connection.start()
        const transactions = database.collection("transactions")

        logger.info(`[transactions repository] searching transactions by userId: ${userId}`)

        const transactionsData = await transactions
            .find<TransactionModel>({ userId: userId })
            .toArray()

        await this.connection.end()

        return transactionsData
            .map((transactionData) => {
                return new Transaction()
                    .withId(transactionData._id)
                    .withUserId(transactionData.userId.data)
                    .withDate(transactionData.date)
                    .withExpenseFlag(transactionData.isExpense)
                    .withValue(transactionData.value)
                    .withDescription(transactionData.description)
            })
    }
}
