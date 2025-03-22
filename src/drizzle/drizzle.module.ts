import { type DynamicModule, Module } from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';
import * as schema from 'src/schemas/schema';

interface DrizzleConfig {
  connection: PoolConfig;
  schema: typeof schema; // Tables and relations
}

@Module({})
export class DrizzleModule {
  static forRoot(config: DrizzleConfig): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: 'DRIZZLE_DB',
          useFactory: () => {
            const pool = new Pool(config.connection);
            return drizzle(pool, { schema: config.schema }) as NodePgDatabase<
              typeof schema
            >;
          },
        },
      ],
      exports: ['DRIZZLE_DB'],
      global: true, // Optional: makes DRIZZLE_DB available app-wide
    };
  }
}
