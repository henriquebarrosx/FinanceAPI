import { SignInUseCase } from "#/app/use-cases/session/sign-in"
import { UsersRepository } from "#/infra/repositories/users-repository"
import { MongoClientAdapter } from "#/infra/adapters/mongo-client-adapter"
import { IHttpServer } from "#/infra/adapters/express-adapter/index.gateway"

const connection = new MongoClientAdapter()

const usersRepository = new UsersRepository(connection)

export class Router {
    constructor(private readonly httpServer: IHttpServer) { }

    init(): void {
        this.httpServer.on("post", "/v1/users", (requestBody: any) => {
            const signIn = new SignInUseCase(usersRepository)
            return signIn.execute(requestBody)
        })
    }
}