import { User } from "#/domain/entities/user"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { InvalidArgException } from "#/infra/exceptions/invalid-arg-exception"
import { IUsersRepository } from "#/infra/repositories/users-repository/index.gateway"

export class SocialSignInUseCase {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async execute(input: Input): Promise<IResponse<SuccessOutput | FailedOutput>> {
        const user = this.getUserBuild(input)

        if (await this.validateEmailAlreadyRegistered(user.email)) {
            throw new InvalidArgException(`email <${user.email}> already registered`)
        }

        const { id } = await this.usersRepository.create(user)
        return { status: 201, data: { id } }
    }

    private getUserBuild({ name, email, pictureURL }: Input): User {
        return new User()
            .withName(name)
            .withEmail(email)
            .withPictureURL(pictureURL)
    }

    private async validateEmailAlreadyRegistered(email: string): Promise<boolean> {
        const partialEmail = new RegExp(email, 'i');
        const usersFoundWithPartialEmail = await this.usersRepository.findByEmail(partialEmail)
        return !!usersFoundWithPartialEmail.length
    }
}

export type Input = {
    name: string
    email: string
    pictureURL: string
}

export type SuccessOutput = {
    id: string
}

export type FailedOutput = {
    message: string
}