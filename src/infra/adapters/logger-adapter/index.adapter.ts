import { ILogger } from "./index.gateway"

export class LoggerAdapter implements ILogger {
    info(message: string): void {
        console.log(message)
    }

    error(message: string): void {
        console.error(message)
    }
}