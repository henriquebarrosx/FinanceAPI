export class Email {
    constructor(readonly value: string) { }

    validate() {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.value)
    }
}