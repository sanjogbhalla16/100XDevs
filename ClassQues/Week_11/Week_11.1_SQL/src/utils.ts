import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://example_from_Neon");
    await client.connect();
    return client;
}