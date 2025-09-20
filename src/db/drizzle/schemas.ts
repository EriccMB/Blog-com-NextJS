import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const postTable = sqliteTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImageUrl: text('coverImageUrl').notNull(),
  published: integer('published', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export type PostTableSelectMode = InferSelectModel<typeof postTable>;
export type PostTableInsertMode = InferInsertModel<typeof postTable>;