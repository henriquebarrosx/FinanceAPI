import { Transaction } from "#/domain/entities/transaction"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { ITransactionsRepository } from "#/infra/repositories/transactions-repository/index.gateway"

export class ListTransactionsByUserIdUseCase {
    constructor(private readonly transactionsRepository: ITransactionsRepository) { }

    async execute(userId: string): Promise<IResponse<Transaction[]>> {
        const result = await this.transactionsRepository.findByUserId(userId)
        return { status: 200, data: result }
    }
}