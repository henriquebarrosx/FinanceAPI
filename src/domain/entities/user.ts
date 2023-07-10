export class User {
    private constructor(
        public name: string,
        public email: string,
        public pictureURL: string,
        public id?: string,
    ) { }

    static create({ id, name, email, pictureURL }: Input) {
        return new User(name, email, pictureURL, id)
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