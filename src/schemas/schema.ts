import { createDrizzleSchema } from './drizzleSchema';
import { relations } from 'drizzle-orm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

export const users = createDrizzleSchema('users', User);

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
