// src/user/user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { type schemaType, users } from '../schemas/drizzleSchema';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UserService {
  constructor(@Inject('DRIZZLE_DB') private db: NodePgDatabase<schemaType>) {}

  async createUser(firstName: string, lastName: string) {
    return this.db.insert(users).values({ firstName, lastName }).returning();
  }

  async getUser(id: number) {
    return this.db.select().from(users).where(eq(users.id, id)).limit(1);
  }

  async getUserWithPosts(id: number) {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
      with: { posts: true },
    });
  }
}
