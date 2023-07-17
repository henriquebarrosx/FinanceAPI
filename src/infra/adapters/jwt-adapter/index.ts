import jwt from "jsonwebtoken"
import { IAuthenticator } from "./index.gateway"
import { NotAuthorizedException } from "#/infra/exceptions/not-authorized-exception"

export class JwtAdapter implements IAuthenticator {
    assign(data: string): string {
        const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!
        return jwt.sign(data, PRIVATE_KEY)
    }

    verify(token: string): any {
        try {
            const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!
            const decodedToken = jwt.verify(token, PRIVATE_KEY)
            return decodedToken
        }

        catch {
            throw new NotAuthorizedException("Invalid Secret Token")
        }
    }
}