import { User } from "../domain/user.entity";

//interface para padronizar os métodos no repository de user
export interface IUserRepository{
    save(user: User): Promise<void>
}