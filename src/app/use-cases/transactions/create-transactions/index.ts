import { Transaction } from "#/domain/entities/transaction"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { ITransactionsRepository } from "#/infra/repositories/transactions-repository/index.gateway"

export class CreateTransactionsUseCase {
    constructor(private readonly transactionsRepository: ITransactionsRepository) { }

    async execute(input: Input): Promise<IResponse<Output>> {
        const transaction = this.getTransactionBuild(input)
        const { id } = await this.transactionsRepository.create(transaction)
        return { status: 201, data: { id } }
    }

    private getTransactionBuild(transactionData: Input): Transaction {
        return new Transaction()
            .withUserId(transactionData.userId)
            .withDate(transactionData.date)
            .withExpenseFlag(transactionData.isExpense)
            .withValue(transactionData.value)
            .withDescription(transactionData.description)
    }
}

export type Input = {
    userId: string
    date: Date
    isExpense: boolean
    value: number
    description: string
}

export type Output = {
    id: string
}