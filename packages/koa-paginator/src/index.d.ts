import * as Koa from 'koa'

export class Page<T = any> {
	total: number;
	size: number;
	number: number;
	list: Array<T>;
	readonly start: number;
	readonly end: number;
	filter: any;
}

type Initalizator = (ctx: Koa.Context, page: Page) => any;
type ErrorHandler = (error: Error) => any;

declare module 'koa' {
	interface Context {
		page?: Page;
	}
}

export function Middleware(init: Initalizator, onError?: ErrorHandler): Koa.Middleware;
