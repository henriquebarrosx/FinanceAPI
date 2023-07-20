import { User } from "#/domain/entities/user"

export type UserModel = Omit<User, "id"> & {
    _id: string
}