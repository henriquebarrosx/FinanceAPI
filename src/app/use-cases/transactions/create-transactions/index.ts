import { logger } from "#/infra/adapters/logger-adapter"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"

export class CreateTransactionsUseCase {
    async execute(): Promise<IResponse<void>> {
        logger.info("Transaction created")
        return { status: 201 }
    }
}