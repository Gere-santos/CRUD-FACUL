import mysql from "mysql"

export const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gere1234",
    database: "crud"
})