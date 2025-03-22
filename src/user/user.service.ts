import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../schemas/schema';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UserService {
  constructor(
    @Inject('DRIZZLE_DB') private db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(firstName: string, lastName: string) {
    return this.db
      .insert(schema.users)
      .values({ firstName, lastName })
      .returning();
  }

  async getUser(id: number) {
    return this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
  }

  async getUserWithPosts(id: number) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
      with: { posts: true },
    });
  }
}
