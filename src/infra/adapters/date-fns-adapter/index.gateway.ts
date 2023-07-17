export interface ILocalDateAdapter {
    isValid(date: Date | string | number): boolean
    format(date: Date | string | number, format: LocalDateFormatEnum): string
}

export enum LocalDateFormatEnum {
    DATE = "yyyy-MM-dd"
}