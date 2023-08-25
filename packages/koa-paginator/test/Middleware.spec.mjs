import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import Koa from 'koa';

import * as Paginator from '../src/index.mjs';

describe('::Middleware', function () {
	it('should throw if bad init.', function () {
		assert.throws(() => Paginator.Middleware(), {
			name: 'TypeError',
			message: 'Invalid "init", one "function" expected.',
		});
	});

	it('should throw if bad onError.', function () {
		assert.throws(() => Paginator.Middleware(() => {}, null), {
			name: 'TypeError',
			message: 'Invalid "onError", one "function" expected.',
		});
	});

	it('should get middleware.', function () {
		Paginator.Middleware(() => {});
	});

	describe('>middleware()', function () {
		let server;

		this.beforeAll(async function start() {
			const app = new Koa();

			app.use(Paginator.Middleware((ctx, page) => {
				page.size = Number(ctx.query.size);
			}, console.log)).use(ctx => {
				ctx.body = ctx.page;
			});

			server = app.listen(8080, '::');
		}).afterAll(function close() {
			server.close();
		});

		it('should get 200 with a page.', async function () {
			const response = await fetch('http://[::1]:8080/?size=20');
			const json = await response.json();

			assert.deepEqual(json, {
				size: 20,
				number: 0,
				total: 0,
				list: [],
				filter: null,
			});
		});

		it('shoud get 400.', async function () {
			const response = await fetch('http://[::1]:8080/?size=a');

			assert.equal(response.status, 400);
		});
	});
});
