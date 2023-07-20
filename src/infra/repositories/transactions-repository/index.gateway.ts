import { Transaction } from "#/domain/entities/transaction"

export interface ITransactionsRepository {
    findByUserId(userId: string): Promise<Transaction[]>
    create(transaction: Transaction): Promise<{ id: string }>
    update(transaction: Transaction): Promise<void>
}