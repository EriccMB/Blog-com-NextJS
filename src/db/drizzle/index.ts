import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postTable } from './schemas';
import { resolve } from 'path';
import Database from 'better-sqlite3';

const sqliteDatabasePath = resolve(process.cwd(), 'db.sqlite3');
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postTable,
  },
  logger: false,
});
