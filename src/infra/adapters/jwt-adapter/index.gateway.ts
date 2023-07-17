export interface IAuthenticator {
    assign(data: string): string
    verify(token: string): any
}