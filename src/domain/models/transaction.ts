import { Transaction } from "#/domain/entities/transaction"

export type TransactionModel = Omit<Transaction, "id" | "userId"> & {
    _id: string
    userId: {
        data: string
        iat: number
    }
}