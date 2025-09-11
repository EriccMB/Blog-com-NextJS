import {defineconfig} from 'drizzle-kit';

export default defineconfig ({
    out: './src/db/drizzle/migrations',
    schema: './src/db/drizzle/schemas.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: './db.sqlite3'
    }
})