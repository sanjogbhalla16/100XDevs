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

async function createUsersAddressTable() {
    const result = await client.query(
        `CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`
    )
    console.log(result);
}
createUsersAddressTable();