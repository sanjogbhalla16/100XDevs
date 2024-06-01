//write a function to create a users table in your database
import { Client } from 'pg'

const client = new Client({

    connectionString: "postgres://postgres.mhtfauovamvhexrclcdc:C@smos162210@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
})



async function createUsersTable() {
    await client.connect();//this takes some time to connect
    const result = await client.query(
        `CREATE TABLE Users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
    )
    console.log(result)
}
createUsersTable();