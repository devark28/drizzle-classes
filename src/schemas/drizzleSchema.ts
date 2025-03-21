// src/schemas/schemas.ts
import 'reflect-metadata';
import { pgTable } from 'drizzle-orm/pg-core';
import type { columnTypes } from './drizzleSchema';

// Decorator
export function Column<T = ColumnTypes>(columnDef: T) {
  return (target: object, propertyKey: string) => {
    Reflect.defineMetadata('drizzle:column', columnDef, target, propertyKey);
  };
}

// Transformer
export function createDrizzleSchema<T extends object>(
  tableName: string,
  myClass: new () => T,
) {
  const instance = new myClass();
  const schema: Record<string, ColumnTypes> = {};
  const properties = Object.getOwnPropertyNames(instance);

  for (const prop of properties) {
    const columnDef = Reflect.getMetadata(
      'drizzle:column',
      instance,
      prop,
    ) as ColumnTypes;
    if (columnDef) {
      schema[prop] = columnDef;
    }
  }
  return pgTable(tableName, schema);
}
