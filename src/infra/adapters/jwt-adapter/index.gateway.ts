export interface ITokenizer {
    assign(data: string): string
    verify(): boolean
}