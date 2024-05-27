import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://");
    await client.connect();
    return client;
}