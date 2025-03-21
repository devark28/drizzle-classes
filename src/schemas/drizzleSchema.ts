// src/schemas/drizzleSchema.ts
import 'reflect-metadata';
import { pgTable } from 'drizzle-orm/pg-core';
import { ColumnTypes } from './drizzleSchema.types';

const metadataStore = new WeakMap();

// Decorator
export function Column<T = ColumnTypes>(columnDef: T) {
  return <K extends object>(target: K, propertyKey: string) => {
    metadataStore.set(target, {
      ...(metadataStore.get(target) || {}),
      [propertyKey]: columnDef,
    });
  };
}

// Transformer
export function createDrizzleSchema<T extends object>(
  tableName: string,
  myClass: new () => T,
) {
  const metadata =
    (metadataStore.get(myClass.prototype) as Record<string, ColumnTypes>) || {};
  metadataStore.delete(myClass.prototype);
  return pgTable(tableName, metadata);
}
