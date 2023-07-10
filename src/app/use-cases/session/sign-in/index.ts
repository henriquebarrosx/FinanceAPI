import { User } from "#/domain/entities/user"
import { logger } from "#/infra/adapters/logger-adapter"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { IUsersRepository } from "#/infra/repositories/users-repository/index.gateway"

export class SignInUseCase {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async execute(requestBody: Input): Promise<IResponse<SuccessOutput | FailedOutput>> {
        try {
            const { name, email, pictureURL } = requestBody
            const user = User.create({ name, email, pictureURL })

            if (await this.validateEmailAlreadyRegistered(user.email)) {
                return {
                    status: 400,
                    data: { message: `email <${email}> already registered` }
                }
            }

            if (!this.validatePictureURL(pictureURL)) {
                return {
                    status: 400,
                    data: { message: `invalid picture url` }
                }
            }

            const { id } = await this.usersRepository.create(user)
            return { status: 201, data: { id } }
        }

        catch (e) {
            logger.error(`[sign in use case] internal server error: ${JSON.stringify(e)}`)
            return { status: 500 }
        }
    }

    private async validateEmailAlreadyRegistered(email: string): Promise<boolean> {
        const partialEmail = new RegExp(email, 'i');
        const usersWithProvidedEmail = await this.usersRepository.findByEmail(partialEmail)
        return !!usersWithProvidedEmail.length
    }

    private validatePictureURL(pictureURL: string): boolean {
        return pictureURL.startsWith("https://")
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