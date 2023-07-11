import { User } from "#/domain/entities/user"
import { Email } from "#/domain/entities/email"
import { logger } from "#/infra/adapters/logger-adapter"
import { IResponse } from "#/infra/adapters/express-adapter/index.gateway"
import { IUsersRepository } from "#/infra/repositories/users-repository/index.gateway"

export class SocialSignInUseCase {
    constructor(private readonly usersRepository: IUsersRepository) { }

    async execute(requestBody: Input): Promise<IResponse<SuccessOutput | FailedOutput>> {
        try {
            const { name, email, pictureURL } = requestBody

            if (pictureURL && !this.validatePictureURL(pictureURL)) {
                return {
                    status: 400,
                    data: { message: `invalid picture url` }
                }
            }

            if (!this.validateEmail(email)) {
                return {
                    status: 400,
                    data: { message: `invalid email format` }
                }
            }

            const user = User.create({ name, email, pictureURL })

            if (await this.validateEmailAlreadyRegistered(user.email)) {
                return {
                    status: 400,
                    data: { message: `email <${email}> already registered` }
                }
            }

            const { id } = await this.usersRepository.create(user)
            return { status: 201, data: { id } }
        }

        catch (e: any) {
            logger.error(`[sign in use case] internal server error: ${e?.message}`)
            return { status: 500 }
        }
    }

    private validateEmail(email: string): boolean {
        try {
            const emailAddress = new Email(email)
            return emailAddress.validate()
        } catch {
            return false
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