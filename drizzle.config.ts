import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env file
loadEnvConfig(process.cwd());

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  connectionString: process.env['DATABASE_URL']!,
} satisfies Config;