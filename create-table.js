import sql from './database.js'

sql`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50),
        senha1 VARCHAR(50),
        senha2 VARCHAR(50),
        senha3 VARCHAR(50)
    );
`.then(() =>{
    console.log("Tabela criada")
})