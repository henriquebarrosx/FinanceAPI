export interface IHttpServer {
    init(): void
    on(requestType: IRequestType, entrypoint: string, callback: Function): void
}

export type IRequestType = "post" | "put" | "patch" | "get" | "delete"

export interface IResponse<T> {
    status: 200 | 201 | 400 | 401 | 404 | 500
    data?: T
} 
