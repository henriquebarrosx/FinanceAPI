export interface ILocalDateAdapter {
    isValid(date: Date | string | number): boolean
    format(date: Date | string | number, format: LocalDateFormatEnum): string
    toZonedTime(date: Date | string | number): Date
}

export enum LocalDateFormatEnum {
    DATE = "yyyy-MM-dd",
    TIMESTAMP = "yyyy-MM-dd hh:mm:ss"
}