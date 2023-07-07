import { logger } from "../../../../infra/adapters/logger-adapter"
import { Transaction } from "../../../../domain/entities/transaction"
import { IResponse } from "../../../../infra/adapters/express-adapter/index.gateway"

export class ListTransactionsUseCase {
    async execute(): Promise<IResponse<Transaction[]>> {
        logger.info("Transaction retrieved")
        return { status: 200, data: [] }
    }
}