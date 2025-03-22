import { getColumns } from './drizzle-column.utils';
import { relations } from 'drizzle-orm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', getColumns(User));

export const posts = pgTable('posts', getColumns(Post));

// Relations
export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author],
    references: [users.id],
  }),
}));
