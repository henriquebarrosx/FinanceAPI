import jwt from "jsonwebtoken"
import { ITokenizer } from "./index.gateway"

export class JwtAdapter implements ITokenizer {
    assign(data: string): string {
        const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!
        return jwt.sign({ data }, PRIVATE_KEY)
    }

    verify(): boolean {
        throw new Error("Method not implemented.");
    }
}