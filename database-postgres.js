import { randomUUID } from "node:crypto"
import { sql } from './database.js'

export class DatabasePostgres {
    
    async create(user){
        const userId = randomUUID()
        const { username, password1, password2, password3 } = user
        const foundUser = await this.findUser(username);
        if (foundUser.length > 0) {
            throw new Error("Usuário já existe");
        }
        console.log("foundouser", foundUser);
        await sql`insert into users (id, username, password1, password2, password3) VALUES (${userId}, ${username}, ${password1}, ${password2}, ${password3})`
    }
    async findUser(username){
        return await sql`select * from users where username = ${username} limit 1`
    }
}