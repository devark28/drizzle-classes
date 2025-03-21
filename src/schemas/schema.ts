import { createDrizzleSchema } from './drizzleSchema';
import { relations } from 'drizzle-orm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

export const users = createDrizzleSchema('users', User);
// export const users = User.getTable();
// console.log('----->', users);

export const posts = createDrizzleSchema('posts', Post);
// export const posts = Post.getTable();

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
