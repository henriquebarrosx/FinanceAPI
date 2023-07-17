import { Transaction } from "#/domain/entities/transaction"

export interface ITransactionsRepository {
    create(transaction: Transaction): Promise<{ id: string }>
    findAll(): Promise<Transaction[]>
    findByUserId(userId: string): Promise<Transaction[]>
}