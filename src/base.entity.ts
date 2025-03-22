import { Column } from './schemas/drizzle-column.utils';
import { timestamp, serial } from 'drizzle-orm/pg-core';

// Post Schema
export class BaseEntity {
  @Column(serial('id').primaryKey())
  id: number;

  @Column(timestamp('created_at'))
  createdAt: Date;

  @Column(timestamp('updated_at'))
  updatedAt: Date;
}
