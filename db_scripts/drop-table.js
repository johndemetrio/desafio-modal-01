import { sql } from '../database.js'


sql`
    DROP TABLE users
`.then(() =>{
    console.log("Tabela deletada")
})