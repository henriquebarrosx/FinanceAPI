import { Transaction } from "#/domain/entities/transaction"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { ITransactionsRepository } from "#/infra/repositories/transactions-repository/index.gateway"

export class UpdateTransactionsUseCase {
    constructor(private readonly transactionsRepository: ITransactionsRepository) { }

    async execute(input: Input): Promise<IResponse<Output>> {
        const transaction = this.getTransactionBuild(input)
        await this.transactionsRepository.update(transaction)
        return { status: 204 }
    }

    private getTransactionBuild(transactionData: Input): Transaction {
        return new Transaction()
            .withId(transactionData.id)
            .withUserId(transactionData.id)
            .withUserId(transactionData.userId)
            .withDate(transactionData.date)
            .withExpenseFlag(transactionData.isExpense)
            .withValue(transactionData.value)
            .withDescription(transactionData.description)
    }
}

export type Input = {
    id: string
    userId: string
    date: Date
    isExpense: boolean
    value: number
    description: string
}

type Output = {}