import { Client } from "pg";

const client = new Client({
    connectionString: "postgres://postgres.mhtfauovamvhexrclcdc:C@smos162210@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
})

async function updateUsersTable(username: string, email: string, password: string) {
    await client.connect();
    const insertQuery = "INSERT INTO users (username , email , password) VALUES ($1 ,$2,$3)";
    const values = [username, email, password];
    const result = await client.query(insertQuery, values);
    console.log('Insertion success:', result); // Output insertion result
}
updateUsersTable('username1', 'user1@example.com', 'user_password').catch(console.error);

async function updateUsersAddress(user_id: number, city: string, country: string, street: string, pincode: string) {
    const insertQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
    const values = [user_id, city, country, street, pincode];
    const result = await client.query(insertQuery, values);
    console.log('Insertion success:', result);
}
updateUsersAddress(1, 'New York', 'USA', '123 Broadway St', '10001').catch(console.error);

