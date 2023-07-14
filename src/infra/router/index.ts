import { JwtAdapter } from "#/infra/adapters/jwt-adapter"
import { SignInUseCase } from "#/app/use-cases/session/sign-in"
import { UsersRepository } from "#/infra/repositories/users-repository"
import { MongoClientAdapter } from "#/infra/adapters/mongo-client-adapter"
import { IHttpServer } from "#/infra/adapters/express-adapter/index.gateway"

const tokenGenerator = new JwtAdapter()
const connection = new MongoClientAdapter()

const usersRepository = new UsersRepository(connection)

export class Router {
    constructor(private readonly httpServer: IHttpServer) { }

    init(): void {
        this.httpServer.on("post", "/v1/sign-in/social", (requestBody: any) => {
            const signIn = new SignInUseCase(tokenGenerator, usersRepository)
            return signIn.execute(requestBody)
        })
    }
}