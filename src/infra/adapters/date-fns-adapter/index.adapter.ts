import { format } from "date-fns"
import { ILocalDateAdapter, LocalDateFormatEnum } from "./index.gateway"

export class DateFnsAdapter implements ILocalDateAdapter {
    format(date: string | number | Date, formatType: LocalDateFormatEnum): string {
        return format(new Date(date), formatType)
    }

    toZonedTime(date: string | number | Date): Date {
        const formattedDate = new Date(date).toISOString().split(".")[0]
        return new Date(formattedDate)
    }

    isValid(date: string | number | Date): boolean {
        return Number.isInteger(new Date(date).getTime())
    }
}