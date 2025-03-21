// src/drizzle/drizzle.module.ts
import { type DynamicModule, Module } from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { Pool, type PoolConfig } from 'pg';
import type { schemaType } from 'src/schemas/drizzleSchema';

interface DrizzleConfig {
  connection: PoolConfig;
  schema: schemaType; // Tables and relations
}

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DrizzleModule {
  static forRoot(config: DrizzleConfig): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: 'DRIZZLE_DB',
          useFactory: () => {
            const pool = new Pool(config.connection);
            return drizzle(pool, { schema: config.schema });
          },
        },
      ],
      exports: ['DRIZZLE_DB'],
      global: true, // Optional: makes DRIZZLE_DB available app-wide
    };
  }
}
