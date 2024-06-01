import { Client } from "pg";

const client = new Client({
    connectionString: "postgres://postgres.mhtfauovamvhexrclcdc:C@smos162210@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
})

async function getUserTableData(email: string) {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
        console.log('user found:', result.rows[0]);
        return result.rows[0];
    } else {
        console.log('No user found with the given email.');
        return null; // Return null if no user was found
    }
}
getUserTableData('user5@example.com').catch(console.error);

async function getUserAndAddressTableData(user_id: number) {
    const query = `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode FROM users
    JOIN addresses ON users.id = addresses.user_id
    WHERE users.id = $1; `;
    const values = [user_id];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
        console.log('user found:', result.rows[0]);
        return result.rows[0];
    } else {
        console.log('No address was found with the given user_id.');
        return null; // Return null if no user was found
    }
}
getUserAndAddressTableData(1);