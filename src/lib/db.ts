import 'server-only';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) throw new Error('DATABASE_URL environment variable is not set');

if (process.env.NODE_ENV === 'production' && !databaseUrl.includes('-pooler.')) {
    console.warn('Warning: It is recommended to use a connection pooler in production. Consider using Neon\'s connection pooler for better performance and reliability.');
}

export const db = neon(databaseUrl);