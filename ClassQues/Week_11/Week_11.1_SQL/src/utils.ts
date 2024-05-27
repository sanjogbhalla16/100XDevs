import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://Postgres%20Test_owner:iL1A3HdWpqma@ep-shiny-silence-a48xpwbm.us-east-1.aws.neon.tech/Postgres%20Test?sslmode=require");
    await client.connect();
    return client;
}