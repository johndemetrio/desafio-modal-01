import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
import { passwordSHA1, passwordSHA256, passwordSHA512, validatePassword1, validatePassword2, validatePassword3 } from "./password-encrypt.js";

const server = fastify()
const database = new DatabasePostgres()

server.post('/users', async (request, reply) =>{
    const { username, password1, password2, password3 } = request.body
    const encryptedPassword1 = passwordSHA1(password1);
    const encryptedPassword2 = passwordSHA256(password2);
    const encryptedPassword3 = passwordSHA512(password3);
    try{ await database.create({
        username,
        password1:encryptedPassword1,
        password2:encryptedPassword2,
        password3:encryptedPassword3,
    })} catch(e){
    return reply.status(409).send(e)
    }
    return reply.status(201).send()
})

server.post('/login', async(request, reply) =>{
    const { username, password1, password2, password3 } = request.body
    const user = await database.findUser(username)
    if (user.length === 0) {
        return reply.status(404).send()
    }
    const foundUser = user[0];
    const validPass1 = validatePassword1(password1, foundUser.password1);
    const validPass2 = validatePassword2(password2, foundUser.password2);
    const validPass3 = validatePassword3(password3, foundUser.password3);
    if (validPass1 && validPass2 && validPass3) {
        return reply.status(200).send("Cofre desbloqueado!");
    }
    return reply.status(401).send("Senha incorreta!");
})

server.listen({
    port: 3333,
})