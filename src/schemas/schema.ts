import { createDrizzleSchema, Post, User } from './schemas';
import { relations } from 'drizzle-orm';

export const users = createDrizzleSchema('users', User);
console.log('----->', users);

export const posts = createDrizzleSchema('posts', Post);

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
/*
// Export schema with relations
export const schema = {
  users,
  posts,
  userRelations,
  postRelations,
};
*/
