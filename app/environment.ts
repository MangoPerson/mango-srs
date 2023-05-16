import PocketBase from 'pocketbase';
import { z } from 'zod';

const Environment = z.object({
    DB_URL: z.string().url().nonempty(),
});

let env = Environment.parse({
    DB_URL: process.env.NEXT_PUBLIC_DB_URL
});

export const pb = new PocketBase(env.DB_URL);