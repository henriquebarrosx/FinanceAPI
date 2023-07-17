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

    private getTransactionBuild(transaction: Input): Transaction {
        return new Transaction()
            .withUserId(transaction.userId)
            .withDate(transaction.date)
            .withType(transaction.type)
            .withValue(transaction.value)
            .withDescription(transaction.description)
    }
}

export type Input = {
    userId: string
    date: Date
    type: "IN" | "OUT"
    value: number
    description: string
}

export type Output = {
    id: string
}