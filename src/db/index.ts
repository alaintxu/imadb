import 'server-only';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) throw new Error('DATABASE_URL environment variable is not set');

if (process.env.NODE_ENV === 'production' && !databaseUrl.includes('-pooler.')) {
    console.warn('Warning: It is recommended to use a connection pooler in production. Consider using Neon\'s connection pooler for better performance and reliability.');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
export * from './schema';