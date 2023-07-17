import { format } from "date-fns"
import { ILocalDateAdapter, LocalDateFormatEnum } from "./index.gateway"

export class DateFnsAdapter implements ILocalDateAdapter {
    format(date: string | number | Date, formatType: LocalDateFormatEnum): string {
        return format(new Date(date), formatType)
    }

    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    }
}