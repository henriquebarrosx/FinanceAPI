import { IException } from "./exception.gateway"

export class NotAuthorizedException extends Error implements IException {
    public code = 401

    constructor(message: string) {
        super(message)
        this.name = "NotAuthorizedException"
    }
}