import { IException } from "./exception.gateway"

export class InvalidArgException extends Error implements IException {
    public code = 400

    constructor(message: string) {
        super(message)
        this.name = "InvalidArgException"
    }
}