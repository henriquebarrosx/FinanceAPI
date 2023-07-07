import { ILogger } from "./index.gateway"
import { LoggerAdapter } from "./index.adapter"

export class LoggerSingleton {
    private static instance: ILogger

    private constructor() { }

    static getInstance(): ILogger {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new LoggerAdapter()
        }

        return LoggerSingleton.instance
    }
}