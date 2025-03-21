// src/post/post.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { posts, type schemaType } from '../schemas/drizzleSchema';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostService {
  constructor(@Inject('DRIZZLE_DB') private db: NodePgDatabase<schemaType>) {}

  async createPost(title: string, content: string, author: number) {
    return this.db.insert(posts).values({ title, content, author }).returning();
  }

  async getPost(id: number) {
    return this.db.select().from(posts).where(eq(posts.id, id)).limit(1);
  }

  async getPostWithAuthor(id: number) {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: { author: true },
    });
  }
}
