import Dotenv from "dotenv"
import { IAppEnv } from "./index.gateway"

export class DotEnvAdapter implements IAppEnv {
    init(): void {
        Dotenv.config()
    }
}