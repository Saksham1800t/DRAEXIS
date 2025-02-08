import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:npg_kKPGsZ8lFa0e@ep-rapid-firefly-a8h8t4tw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
export const db = drizzle({ client: sql });

