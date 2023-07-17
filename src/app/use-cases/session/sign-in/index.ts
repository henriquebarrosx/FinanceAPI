import { User } from "#/domain/entities/user"
import { IAuthenticator } from "#/infra/adapters/jwt-adapter/index.gateway"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { IUsersRepository } from "#/infra/repositories/users-repository/index.gateway"

export class SignInUseCase {
    constructor(
        private readonly authentication: IAuthenticator,
        private readonly usersRepository: IUsersRepository
    ) { }

    async execute(input: Input): Promise<IResponse<Output>> {
        const user = this.getUserBuild(input)
        const foundUser = await this.usersRepository.findByEmail(user.email)

        if (foundUser) {
            const accessToken = this.authentication.assign(foundUser.id)
            return { status: 200, data: { accessToken } }
        }

        const { id } = await this.usersRepository.create(user)
        const accessToken = this.authentication.assign(id)

        return { status: 200, data: { accessToken } }
    }

    private getUserBuild({ name, email, pictureURL }: Input): User {
        return new User()
            .withName(name)
            .withEmail(email)
            .withPictureURL(pictureURL)
    }
}

export type Input = {
    name: string
    email: string
    pictureURL: string
}

export type Output = {
    accessToken: string
}