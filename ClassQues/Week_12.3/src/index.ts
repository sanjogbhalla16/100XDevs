// write a function to create a users table in your database.
import { Client } from 'pg'

const client = new Client({
    connectionString: "postgres://postgres"
})

async function insertUserData(username: string, email: string, password: string,) {
    await client.connect()
    const result = await client.query(`
        INSERT INTO users2(username, email,password)
        VALUES('${username}','${email}','${password}')
    `)
    console.log(result)
}

insertUserData(
    'bhalla Ji',
    'bhallaJi@gmail.com',
    'bhalla@123'
);