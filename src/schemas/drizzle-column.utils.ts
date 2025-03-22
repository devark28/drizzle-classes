import 'reflect-metadata';
import { ColumnTypes } from './drizzle-column.types';

const metadataStore = new WeakMap();
const MAX_PROTOTYPE_CHAIN_DEPTH = 3;

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
  let columns = {} as Record<string, ColumnTypes>;
  let currentPrototype = myClass.prototype as object;
  for (let i = 0; i < MAX_PROTOTYPE_CHAIN_DEPTH; i++) {
    const metadata =
      (metadataStore.get(currentPrototype) as Record<string, ColumnTypes>) ||
      {};
    columns = { ...columns, ...metadata };
    if (currentPrototype) {
      currentPrototype = Object.getPrototypeOf(currentPrototype) as object;
    } else {
      break;
    }
  }
  return columns;
}
