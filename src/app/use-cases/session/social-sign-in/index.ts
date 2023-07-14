import { User } from "#/domain/entities/user"
import { ITokenizer } from "#/infra/adapters/jwt-adapter/index.gateway"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { IUsersRepository } from "#/infra/repositories/users-repository/index.gateway"

export class SocialSignInUseCase {
    constructor(
        private readonly tokenGenerator: ITokenizer,
        private readonly usersRepository: IUsersRepository
    ) { }

    async execute(input: Input): Promise<IResponse<Output>> {
        const user = this.getUserBuild(input)
        const foundUser = await this.usersRepository.findByEmail(user.email)

        if (foundUser) {
            const token = this.tokenGenerator.assign(foundUser.id)
            return { status: 200, data: { token } }
        }

        const { id } = await this.usersRepository.create(user)
        const token = this.tokenGenerator.assign(id)

        return { status: 200, data: { token } }
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
    token: string
}