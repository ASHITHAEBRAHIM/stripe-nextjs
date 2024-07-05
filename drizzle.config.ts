import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export default{
  schema: "./db/schema.ts",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL as string, 
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  out: "./drizzle",
  verbose: true,
  strict: true, 
} satisfies Config
