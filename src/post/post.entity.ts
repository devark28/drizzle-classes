import { Column } from '../schemas/drizzleSchema';
import { integer, serial, varchar } from 'drizzle-orm/pg-core';
import * as schema from '../schemas/schema';

// Post Schema
export class Post {
  @Column(serial('id').primaryKey())
  id: number;

  @Column(varchar('title', { length: 256 }))
  title: string;

  @Column(varchar('content', { length: 1024 }))
  content: string;

  @Column(integer('author').references(() => schema.users.id))
  author: number;
}
