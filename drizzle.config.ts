import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['src/schemas/schema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'mydb',
  },
  out: './migrations',
});
