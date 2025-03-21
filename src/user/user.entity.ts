import { Column } from '../schemas/drizzleSchema';
import { serial, varchar } from 'drizzle-orm/pg-core';

// User Schema
export class User {
  @Column(serial('id').primaryKey())
  id: number;

  @Column(varchar('first_name', { length: 256 }))
  firstName: string;

  @Column(varchar('last_name', { length: 256 }))
  lastName: string;
}
