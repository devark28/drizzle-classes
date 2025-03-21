import {
  PgBigInt53BuilderInitial, PgBigInt64BuilderInitial, PgBigSerial53BuilderInitial, PgBigSerial64BuilderInitial,
  PgBooleanBuilderInitial,
  PgCharBuilderInitial,
  PgDateBuilderInitial,
  PgDateStringBuilderInitial,
  PgDoublePrecisionBuilderInitial, PgEnumColumnBuilderInitial,
  PgIntegerBuilderInitial,
  PgJsonbBuilderInitial,
  PgJsonBuilderInitial,
  PgNumericBuilderInitial,
  PgRealBuilderInitial,
  PgSerialBuilderInitial, PgSmallIntBuilderInitial, PgSmallSerialBuilderInitial,
  PgTimeBuilderInitial,
  PgTimestampBuilderInitial, PgTimestampStringBuilderInitial,
  PgUUIDBuilderInitial,
  PgVarcharBuilderInitial,
} from 'drizzle-orm/pg-core/index';

export type ColumnTypes =
  | PgVarcharBuilderInitial<any, any, any>
  | PgSerialBuilderInitial<any>
  | PgIntegerBuilderInitial<any>
  | PgBooleanBuilderInitial<any>
  | PgDateBuilderInitial<any>
  | PgJsonbBuilderInitial<any>
  | PgRealBuilderInitial<any>
  | PgNumericBuilderInitial<any>
  | PgTimeBuilderInitial<any>
  | PgJsonBuilderInitial<any>
  | PgUUIDBuilderInitial<any>
  | PgTimestampBuilderInitial<any>
  | PgDateStringBuilderInitial<any>
  | PgDoublePrecisionBuilderInitial<any>
  | PgCharBuilderInitial<any, any, any>
  | PgEnumColumnBuilderInitial<any, any>
  | PgSmallIntBuilderInitial<any>
  | PgSmallSerialBuilderInitial<any>
  | PgTimestampStringBuilderInitial<any>
  | PgBigInt53BuilderInitial<any>
  | PgBigInt64BuilderInitial<any>
  | PgBigSerial53BuilderInitial<any>
  | PgBigSerial64BuilderInitial<any>;
