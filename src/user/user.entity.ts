import { Column } from '../schemas/drizzle-column.utils';
import { serial, varchar } from 'drizzle-orm/pg-core';
import { BaseEntity } from '../base.entity';

// User Schema
export class User extends BaseEntity {
  @Column(varchar('first_name', { length: 256 }))
  firstName: string;

  @Column(varchar('last_name', { length: 256 }))
  lastName: string;
}
