// src/app.module.ts
import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { schema } from './schemas/drizzleSchema';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    DrizzleModule.forRoot({
      connection: {
        connectionString: 'postgres://postgres:password@localhost:5432/mydb',
      },
      schema,
    }),
    // UserModule,
    // PostModule,
  ],
})
export class AppModule {}
