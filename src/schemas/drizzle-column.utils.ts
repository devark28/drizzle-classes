import 'reflect-metadata';
import { ColumnTypes } from './drizzle-column.types';

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
export function getColumns(myClass: new () => any) {
  const metadata =
    (metadataStore.get(myClass.prototype as object) as Record<
      string,
      ColumnTypes
    >) || {};
  metadataStore.delete(myClass.prototype as object);
  return metadata;
}
