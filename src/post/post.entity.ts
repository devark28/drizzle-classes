import { Column } from '../schemas/drizzle-column.utils';
import { integer, serial, varchar } from 'drizzle-orm/pg-core';
import * as schema from '../schemas/schema';
import { BaseEntity } from '../base.entity';

// Post Schema
export class Post extends BaseEntity {
  @Column(varchar('title', { length: 256 }))
  title: string;

  @Column(varchar('content', { length: 1024 }))
  content: string;

  @Column(integer('author').references(() => schema.users.id))
  author: number;
}
