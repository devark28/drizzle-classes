// src/schemas/drizzleSchema.ts
import 'reflect-metadata';
import { pgTable } from 'drizzle-orm/pg-core';
import { ColumnTypes } from './drizzleSchema.types';

const metadataStore = new WeakMap();

// Decorator
export function Column<T = ColumnTypes>(columnDef: T) {
  return <K extends object>(target: K, propertyKey: string) => {
    console.log(`Defining metadata for ${propertyKey} on`, target);
    metadataStore.set(target, {
      ...(metadataStore.get(target) || {}),
      [propertyKey]: columnDef,
    });
  };
}

// Transformer
export function createDrizzleSchema<T extends object & { id: number }>(
  tableName: string,
  myClass: new () => T,
) {
  return pgTable(tableName, metadataStore.get(myClass.prototype) || {});
}
