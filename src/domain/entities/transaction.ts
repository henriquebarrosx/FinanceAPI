import { localDateAdapter } from "#/infra/adapters/date-fns-adapter"
import { TransactionTypeEnum } from "#/domain/enums/transaction-type"
import { InvalidArgException } from "#/infra/exceptions/invalid-arg-exception"

export class Transaction {
    public id: string = ""
    public userId: string = ""
    public date: Date = new Date()
    public type: TransactionTypeEnum = TransactionTypeEnum.GAIN
    public value: number = 0
    public description: string = ""
    public createdAt: Date = new Date()
    public updatedAt: Date = new Date()

    withId(value: string): Transaction {
        this.id = value
        return this
    }

    withUserId(value: string): Transaction {
        this.userId = value
        return this
    }

    withDate(date: Date | string | number): Transaction {
        if (localDateAdapter.isValid(date)) {
            this.date = new Date(date)
            return this
        }

        throw new InvalidArgException("Invalid transaction date")
    }

    withType(value: string): Transaction {
        const convertedValueType = value.toLowerCase() as TransactionTypeEnum
        const acceptedTypes = [TransactionTypeEnum.GAIN, TransactionTypeEnum.EXPENSE]

        if (acceptedTypes.includes(convertedValueType)) {
            this.type = convertedValueType
            return this
        }

        throw new InvalidArgException(`Transaction type only accept: ${acceptedTypes}`)
    }

    withValue(value: number): Transaction {
        const MIN_ALLOWED_TRANSACTION_VALUE = 0

        if (value >= MIN_ALLOWED_TRANSACTION_VALUE) {
            this.value = value
            return this
        }

        throw new InvalidArgException("Invalid transaction value")
    }

    withDescription(value: string): Transaction {
        this.description = value
        return this
    }

    withTimestamp(date: Date | string | number): Transaction {
        if (localDateAdapter.isValid(date)) {
            this.createdAt = new Date(date)
            return this
        }

        throw new InvalidArgException("Invalid created date value")
    }

    withUpdatedAt(date: Date | string | number): Transaction {
        if (localDateAdapter.isValid(date)) {
            this.updatedAt = new Date(date)
            return this
        }

        throw new InvalidArgException("Invalid updated date value")
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            date: this.date,
            type: this.type,
            value: this.value,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}