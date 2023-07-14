import { InvalidArgException } from "#/infra/exceptions/invalid-arg-exception"

export class User {
    public id: string = ""
    public name: string = ""
    public email: string = ""
    public pictureURL: string = ""

    withId(value: string): User {
        this.id = value
        return this
    }

    withName(value: string): User {
        this.name = value
        return this
    }

    withEmail(email: string): User {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            this.email = email
            return this
        }

        throw new InvalidArgException("Invalid e-mail format")
    }

    withPictureURL(url: string): User {
        if (url.startsWith("https://")) {
            this.pictureURL = url
            return this
        }

        throw new InvalidArgException("Invalid picture URL format")
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            pictureURL: this.pictureURL,
        }
    }
}

type Input = {
    id?: string
    name: string
    email: string
    pictureURL: string
}