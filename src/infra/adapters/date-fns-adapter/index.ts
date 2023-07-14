import { ILocalDateAdapter } from "./index.gateway"

export class DateFnsAdapter implements ILocalDateAdapter {
    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    }
}