import { User } from "#/domain/entities/user"
import { IUsersRepository } from "./index.gateway"
import { logger } from "#/infra/adapters/logger-adapter"
import { IConnection } from "#/infra/adapters/mongo-client-adapter/index.adapter"

export class UsersRepository implements IUsersRepository {
    constructor(private readonly connection: IConnection) { }

    async findByEmail(email: string): Promise<User[]> {
        const database = await this.connection.start()
        const collection = database.collection("users")

        logger.info(`[users repository] finding users by email: ${email}`)

        const users: User[] = []
        const results = await collection.find<User>({ email }).toArray()

        results.forEach((result) => {
            const { id, name, email, pictureURL } = result
            users.push(User.create({ id, name, email, pictureURL }))
        })

        this.connection.end()
        return users
    }

    async create(user: User): Promise<{ id: string }> {
        const database = await this.connection.start()
        const collection = database.collection("users")

        logger.info(`[users repository] inserting user: ${JSON.stringify(user.toJSON())}`)

        const result = await collection
            .insertOne({
                name: user.name,
                email: user.email,
                pictureURL: user.pictureURL,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

        this.connection.end()
        return { id: result.insertedId.toString() }
    }
}