export interface IHttpServer {
    init(): void
    on(requestType: IRequestType, entrypoint: string, callback: HttpRequestCallbackType): void
}

export type IRequestType = "post" | "put" | "patch" | "get" | "delete"

export interface IResponse<T> {
    status: 200 | 201 | 204 | 400 | 401 | 404 | 500
    data?: T
}

export type HttpRequestArgsType = { headers: any, body: any, params: any }

export type HttpRequestCallbackType = ({ headers, body, params }: HttpRequestArgsType) => Promise<IResponse<any>>