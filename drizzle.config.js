/** @type {import('drizzle-kit').Config} */
require('dotenv').config();
export default {
    schema: "./configs/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_kKPGsZ8lFa0e@ep-rapid-firefly-a8h8t4tw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
    }
};