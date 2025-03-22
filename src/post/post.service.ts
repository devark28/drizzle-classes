import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../schemas/schema';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostService {
  constructor(
    @Inject('DRIZZLE_DB') private db: NodePgDatabase<typeof schema>,
  ) {}

  async createPost(title: string, content: string, author: number) {
    return this.db
      .insert(schema.posts)
      .values({ title, content, author })
      .returning();
  }

  async getPost(id: number) {
    return this.db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);
  }

  async getPostWithAuthor(id: number) {
    return this.db.query.posts.findFirst({
      where: eq(schema.posts.id, id),
      with: { author: true },
    });
  }
}
