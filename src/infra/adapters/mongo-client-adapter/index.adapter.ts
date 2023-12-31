import { Db } from "mongodb"

export interface IConnection {
    start(): Promise<Db>
    end(): Promise<void>
}