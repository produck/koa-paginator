import * as Koa from 'koa'

export class Query<Item, Filter> {
	total: number;
	filter: Filter;
	readonly length: number;
	list: Array<Item>;
}

export class Page<I = any, F = any> extends Query<I, F> {
	size: number;
	number: number;
	readonly start: number;
	readonly end: number;
}

export class Slice<I = any, F = any> extends Query<I, F> {
	index: number;
	length: number;
	readonly start: number;
	readonly end: number;
}

type Initalizator = (ctx: Koa.Context, page: Page) => any;
type ErrorHandler = (error: Error) => any;

declare module 'koa' {
	interface BaseContext {
		page?: Page;
		slice?: Slice;
	}
}

export function Middleware(init: Initalizator, onError?: ErrorHandler): Koa.Middleware;
