// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: { firstName: string; lastName: string }) {
    return this.userService.createUser(body.firstName, body.lastName);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(parseInt(id));
  }

  @Get(':id/posts')
  async getUserWithPosts(@Param('id') id: string) {
    return this.userService.getUserWithPosts(parseInt(id));
  }
}
