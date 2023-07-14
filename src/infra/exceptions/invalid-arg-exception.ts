export class InvalidArgException extends Error {
    public code = 400

    constructor(message: string) {
        super(message)
        this.name = "InvalidArgException"
    }
}