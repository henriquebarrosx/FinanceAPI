import { UsersRepository } from "#/infra/repositories/users-repository"
import { MongoClientAdapter } from "#/infra/adapters/mongo-client-adapter"
import { SocialSignInUseCase } from "#/app/use-cases/session/social-sign-in"
import { IHttpServer } from "#/infra/adapters/express-adapter/index.gateway"

const connection = new MongoClientAdapter()

const usersRepository = new UsersRepository(connection)

export class Router {
    constructor(private readonly httpServer: IHttpServer) { }

    init(): void {
        this.httpServer.on("post", "/v1/sign-in/social", (requestBody: any) => {
            const socialSignIn = new SocialSignInUseCase(usersRepository)
            return socialSignIn.execute(requestBody)
        })
    }
}