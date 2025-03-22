import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() body: { title: string; content: string; author: number }) {
    return this.postService.createPost(body.title, body.content, body.author);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(parseInt(id));
  }

  @Get(':id/author')
  async getPostWithAuthor(@Param('id') id: string) {
    return this.postService.getPostWithAuthor(parseInt(id));
  }
}
