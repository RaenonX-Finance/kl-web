/* eslint-disable new-cap */
import {Static, Type} from '@sinclair/typebox';


export const AppInitRequestSchema = Type.Object({
  token: Type.String(),
});

export type AppInitRequest = Static<typeof AppInitRequestSchema>;

export const ProductInfoSchema = Type.Object({
  name: Type.String(),
  symbol: Type.String(),
});

export type ProductInfo = Static<typeof ProductInfoSchema>;

export const PeriodInfoSchema = Type.Object({
  min: Type.Integer({exclusiveMinimum: 0}),
  name: Type.String(),
});

export type PeriodInfo = Static<typeof PeriodInfoSchema>;

export const AppInitDataSchema = Type.Object({
  products: Type.Array(ProductInfoSchema),
  periods: Type.Array(PeriodInfoSchema),
});

export type AppInitData = Static<typeof AppInitDataSchema>;
