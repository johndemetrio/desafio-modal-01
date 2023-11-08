import { sql } from '../database.js'

sql`
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        username VARCHAR(50),
        password1 VARCHAR(255),
        password2 VARCHAR(255),
        password3 VARCHAR(255)
    );
`.then(() =>{
    console.log("Tabela criada")
})