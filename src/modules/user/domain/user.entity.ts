const bcrypt = require('bcrypt');
const crypto = require('node:crypto')


export enum UserLevel {
    admin = 1,
    normal
}

interface ICreateUserData {
    username: string, 
    email: string, 
    password: string
}



export class User {

    private constructor(
        public readonly id: string,
        public readonly idUserLevel: UserLevel,
        public readonly username: string,
        public readonly email: string,
        public readonly password: string
        
    ) { }

    static async create({email, password, username}: ICreateUserData): Promise<User> {
        return new User(
            crypto.randomUUID().toString(),
            UserLevel.normal,
            username.trim(),
            email.trim(),
            await bcrypt.hash(password.trim(), 10),
        )
    }
}