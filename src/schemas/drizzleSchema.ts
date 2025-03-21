// src/schemas/drizzleSchema.ts
import 'reflect-metadata';
import { pgTable, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { ColumnTypes } from './drizzleSchema.types';

const metadataStore = new Map();

// Decorator
export function Column<T = ColumnTypes>(columnDef: T) {
  return <K extends object>(target: K, propertyKey: string) => {
    console.log(`Defining metadata for ${propertyKey} on`, target);
    // Reflect.defineMetadata('drizzle:column', columnDef, target, propertyKey);
    metadataStore.set(target, {
      ...(metadataStore.get(target) || {}),
      [propertyKey]: columnDef,
    });
  };
}

// Class Decorator
export function Entity(tableName: string) {
  return function <T extends { new(...args: any[]): object }>(constructor: T) {
    // Get the prototype (class definition)
    const prototype = constructor.prototype;
    // const schema: Record<string, ColumnTypes> = {};

    // Get all properties from the prototype
    // const properties = Object.getOwnPropertyNames(prototype);
    // console.log(tableName, properties);

    const metadataKeys = Reflect.getMetadataKeys(prototype);
    console.log(tableName, metadataKeys); // Debug: should show property-specific keys

    // Filter for properties with 'drizzle:column' metadata
    const properties = metadataKeys
      .filter((key) => typeof key === 'string' && Reflect.hasMetadata('drizzle:column', prototype, key))
      .map((key) => key as string);

    console.log(tableName, properties);

    // Collect metadata for each property
    /*for (const prop of properties) {
      const columnDef = Reflect.getMetadata(
        'drizzle:column',
        prototype,
        prop,
      ) as ColumnTypes;
      if (columnDef) {
        schema[prop] = columnDef;
      }
    }*/
    // Create and attach the table to the constructor
    /*const table = pgTable(tableName, schema);
    Reflect.defineMetadata('drizzle:table', table, constructor);

    // Return a new constructor to preserve the original class
    return class extends constructor {
      static getTable() {
        return Reflect.getMetadata(
          'drizzle:table',
          this,
        ) as PgTableWithColumns<any>;
      }
    };*/
  };
}

// Transformer
export function createDrizzleSchema<T extends object & { id: number }>(
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

  if (tableName === 'users') {
    console.log('============================================================');
    // console.log(pgTable(tableName, schema));
    // console.log(tableName, schema);
    // instance.id = 1;
    // console.log(Object.getOwnPropertyNames(instance));
    // console.log(Reflect.getMetadataKeys(instance));
    console.log(metadataStore.get(myClass.prototype));
    console.log('============================================================');
  }
  return pgTable(tableName, schema);
}
