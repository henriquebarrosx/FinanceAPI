import { User } from "#/domain/entities/user"

export interface IUsersRepository {
    create(user: User): Promise<{ id: string }>
    findByEmail(email: string | RegExp): Promise<User[]>
}